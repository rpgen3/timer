(async () => {
    const {importAll, getScript} = await import('https://rpgen3.github.io/mylib/export/import.mjs');
    await getScript('https://code.jquery.com/jquery-3.3.1.min.js');
    const $ = window.$;
    getScript('https://code.jquery.com/ui/1.12.1/jquery-ui.min.js');
    const html = $('body').empty().css({
        'text-align': 'center',
        padding: '1em',
        'user-select': 'none'
    });
    const ui = $('<div>').appendTo(html);
    const rpgen3 = await importAll([
        'input'
    ].map(v => `https://rpgen3.github.io/mylib/export/${v}.mjs`));
    const addBtn = (ttl, func) => {
        const btn = $('<button>').appendTo(ui).text(ttl).on('click', () => {
            const time = performance.now();
            $('<button>').prop('disabled', true);
            btn.prop('disabled', false).text(`{ttl}(計測終了)`).on('click', () => {
                $('<button>').prop('disabled', false);
                btn.text(ttl);
                func(performance.now() - time);
            });
        });
    };
    let totalTime = 0;
    addBtn('早い', time => {
        viewLapTime(totalTime -= time);
    });
    $('<button>').appendTo(ui).text('定刻').on('click', () => {
        viewLapTime(totalTime);
    });
    addBtn('遅い', time => {
        viewLapTime(totalTime += time);
    });
    $('<button>').appendTo(ui).text('リセット').on('click', () => {
        totalTime = index = 0;
        view.empty();
    });
    const view = $('<div>').appendTo(html);
    let index = 0;
    const viewLapTime = value => rpgen3.addInputStr(view, {
        value, label: index++,
        copy: true
    });
})();
