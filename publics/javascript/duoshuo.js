function toggleDuoshuoComments(container) {
    var obj = $(".ds-thread")
    var el = document.createElement('div');//该div不需要设置class="ds-thread"
    el.setAttribute('data-thread-key', obj.attr("data-thread-key"));//必选参数
    el.setAttribute('data-url', obj.attr("data-url"));//必选参数
    DUOSHUO.EmbedThread(el);
    jQuery(container).append(el);
}