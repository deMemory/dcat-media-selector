// 获取文件类型
function getFileType(suffix) {
    // 用于类型检查
    if (typeof suffix !== 'string') {
        throw new TypeError('期望一个字符串作为后缀');
    }

    // 将所有列表合并为一个对象，并使用Set来提高查找效率
    const fileTypes = {
        // 匹配图片
        image: new Set(['bmp', 'cgm', 'djv', 'djvu', 'gif', 'ico', 'ief', 'jp2', 'jpe', 'jpeg', 'jpg', 'mac', 'pbm', 'pct', 'pgm', 'pic', 'pict', 'png', 'pnm', 'pnt', 'pntg', 'ppm', 'qti', 'qtif', 'ras', 'rgb', 'svg', 'tif', 'tiff', 'wbmp', 'xbm', 'xpm', 'xwd']), // 匹配音频
        audio: new Set(['mp3', 'wav', 'flac', '3pg', 'aa', 'aac', 'ape', 'au', 'm4a', 'mpc', 'ogg']), // 匹配视频
        video: new Set(['mp4', 'rmvb', 'flv', 'mkv', 'avi', 'wmv', 'rm', 'asf', 'mpeg', 'mov']), // 匹配文稿
        powerpoint: new Set(['doc', 'dot', 'docx', 'dotx', 'docm', 'dotm', 'xls', 'xlt', 'xla', 'xlsx', 'xltx', 'xlsm', 'xltm', 'xlam', 'xlsb', 'ppt', 'pdf', 'pot', 'pps', 'ppa', 'pptx', 'potx', 'ppsx', 'ppam', 'pptm', 'potm', 'ppsm']), // 匹配代码
        code: new Set(['php', 'js', 'java', 'python', 'ruby', 'go', 'c', 'cpp', 'sql', 'm', 'h', 'json', 'html', 'aspx']), // 匹配压缩包
        zip: new Set(['zip', 'tar', 'gz', 'rar', 'rpm']), // 匹配文本
        text: new Set(['txt', 'pac', 'log', 'md'])
    };

    // 统一处理后缀名的大小写
    const lowerSuffix = suffix.toLowerCase();

    // 遍历对象的values
    for (const type of Object.values(fileTypes)) {
        if (type.has(lowerSuffix)) {
            return Object.keys(fileTypes)[Object.values(fileTypes).indexOf(type)];
        }
    }

    // 其他文件类型
    return 'other';
}

// 文件预览标签
function fileDisplayHtml(row) {
    var html = '';
    switch (row.media_type) {
        case 'image':
            html = '<img class="img-thumbnail media_preview" data-action="image" data-url="' + row.url + '" src="' + row.url + '">';
            break;
        case 'video':
            html = '<video class="img-thumbnail media_preview" data-action="video" data-url="' + row.url + '" src="' + row.url + '"></video>';
            break;
        case 'audio':
            html = '<i class="fa fa-file-audio-o modal_my_fa img-thumbnail media_preview" data-url="' + row.url + '" data-action="audio"></i>';
            break;
        case 'powerpoint':
            html = '<i class="fa fa-file-word-o modal_my_fa img-thumbnail media_preview" data-url="' + row.url + '" data-action="powerpoint"></i>';
            break;
        case 'code':
            html = '<i class="fa fa-file-code-o modal_my_fa img-thumbnail media_preview" data-url="' + row.url + '" data-action="code"></i>';
            break;
        case 'zip':
            html = '<i class="fa fa-file-zip-o modal_my_fa img-thumbnail media_preview" data-url="' + row.url + '" data-action="zip"></i>';
            break;
        case 'text':
            html = '<i class="fa fa-file modal_my_fa img-thumbnail media_preview" data-url="' + row.url + '" data-action="text"></i>';
            break;
        case 'other':
            html = '<i class="fa fa-file modal_my_fa img-thumbnail media_preview" data-url="' + row.url + '" data-action="other"></i>';
            break;
    }

    return html;
}

function rightTableHtml() {
    var html = '<div class="media_selector_toolbar">';
    html += '<div class="btn-group dropdown grid-select-all-btn media_selector_toolbar_more" style="display: none">';
    html += '<button type="button" class="btn btn-white dropdown-toggle btn-mini btn-outline" data-toggle="dropdown" style="margin-right:3px">';
    html += '<span class="d-none d-sm-inline selected"></span>';
    html += '<span class="caret"></span>';
    html += '<span class="sr-only"></span>';
    html += '</button>';
    html += '<ul class="dropdown-menu" role="menu" style="left: 0; right: inherit;">';
    html += '<li class="dropdown-item"><a class="media_selector_batch_delete"><i class="feather icon-trash"></i> 删除</a></li>';
    html += '<li class="dropdown-item"> <a class="media_selector_batch_mobile"><i class="fa fa-arrows-h"></i> 移动 </a></li>';
    html += '</ul>';
    html += '</div>';
    html += '<button type="button" class="btn btn-primary grid-refresh btn-mini btn-outline media_selector_toolbar_refresh" style="margin-right:3px"><i class="feather icon-refresh-cw"></i> 刷新</button>';
    html += '<button type="button" class="btn btn-primary grid-refresh btn-mini btn-outline media_selector_toolbar_filter" style="margin-right:3px"><i class="feather icon-filter"></i> 筛选</button>';
    html += '<button type="button" class="btn btn-primary grid-refresh btn-mini btn-outline media_selector_toolbar_choose" style="margin-right:3px"><i class="fa fa-check"></i> 选择</button>';
    html += '<span style="position: relative;">';
    html += '<label class="btn btn-success grid-refresh btn-mini btn-outline"><i class="fa fa-upload"></i> 上传';
    html += '<span class="media_selector_modal_percent"></span>';
    html += '<input type="file" class="media_selector_modal_upload" style="display: none;" multiple>';
    html += '</label>';
    html += '</span>';
    html += '</div>';
    html += '<div class="table-responsive"><table class="media_selector_table"></table></div>';
    html += '</div>';

    return html;
}
