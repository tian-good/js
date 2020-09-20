var that;
class Tap {
    constructor(id) {
            //获取元素
            that = this;
            this.main = document.querySelector(id);
            this.add = this.main.querySelector('.tabadd');
            //li的父元素
            this.ul = this.main.querySelector('.fisrstnav ul:first-child');
            //section 父元素
            this.fsection = this.main.querySelector('.tabscon');
            this.init();
        }
        //初始化操作让相关的元素绑定事件
    init() {
        this.updateNode();
        this.add.onclick = this.addTab;
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    }

    //因为我们要动态添加元素，需要重新获取元素
    updateNode() {
            this.lis = this.main.querySelectorAll('li');
            this.sections = this.main.querySelectorAll('section');
            this.remove = this.main.querySelectorAll('.icon-guanbi');
            this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
        }
        //1、切换功能
    toggleTab() {
            // console.log(this.index);
            that.clearClass();
            this.className = 'liactive';
            that.sections[this.index].className = 'conactive';
        }
        //清除所有li和section
    clearClass() {
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].className = '';
                this.sections[i].className = '';
            }
        }
        //2、添加功能
    addTab() {
            that.clearClass();
            // alert(1);
            //创建li元素和section
            var random = Math.random();
            var li = '  <li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
            var section = '<section class="conactive">测试 ' + random + '</section>';
            //把这两个元素追加到对应的父元素里面
            that.ul.insertAdjacentHTML('beforeend', li); //beforeend在最后面加入
            that.fsection.insertAdjacentHTML('beforeend', section);
            that.init();

        }
        //3、删除功能
    removeTab(e) {
            e.stopPropagation(); //阻止冒泡 
            var index = this.parentNode.index;
            // console.log(index); remove()可以删除指定元素
            that.lis[index].remove();
            that.sections[index].remove();
            that.init();
            // 当我们删除了选中状态的这个li 的时候, 让它的前一个li 处于选定状态
            if (document.querySelector('.liactive')) return;
            //当我们删除选中状态的这个li的时候，让它的前一个li'处于选定状态
            index--;
            that.lis[index] && that.lis[index].click();
        }
        //4、修改功能
    editTab() {
        var str = this.innerHTML;
        // alert("11");
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type="text"/>';
        var input = this.children[0];
        input.value = str;
        input.select(); //文本框里面的文字内容处于选定状态
        //当我们离开文本框就把文本里面的值给span
        input.onblur = function() {
            this.parentNode.innerHTML = this.value;
        };
        input.onkeyup = function(e) {
            if (e.keyCode === 13) {
                //手动调用表单失去焦点事件 不需要鼠标离开操作
                this.blur();
            }
        }
    }
}
new Tap('#tab');