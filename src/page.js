class Page {
  constructor() {
    this.id = Number.parseInt(sessionStorage.getItem('page'));
    if (!this.id) this.id = data.pages[0].id;
    let currentPage;
    for (const page of data.pages) {
      let active = false;
      if (page.id === this.id) {
        currentPage = page;
        active = true;
      }
      $('#Page_btns__container').append(`<li class="nav-item page" id="${page.id}"><button class="nav-link ${active ? 'active' : ''}">${page.name}</button></li>`);
    }
    if (!currentPage) currentPage = data.pages[0];
    $('.page').click((e) => {
      sessionStorage.setItem('page', e.currentTarget.id);
      window.location.reload();
    });

    this.name = currentPage.name;
    $('#Page__label').html(this.name);
    this.content = currentPage.content;
    $('#Page__container').html(this.content);
    this.modal();
  }

  modal() {
    const editor = ace.edit("Page__field__content");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/html");
    editor.session.setTabSize(2);
    editor.setShowPrintMargin(false);
    $('#demoModalBtn').click((e) => { $('#demoModal').css('display', 'block'); });
    $('#demoModalCloseBtn').click((e) => $('#demoModal').css('display', 'none'));
    $('#Page_modal').on('show.bs.modal', (e) => {
      switch (e.relatedTarget.id) {
        case 'Page__new':
          $('#Page__btn__delete').hide();
          $('#Page__field__id').val(-1);
          $('#Page__field__name').val('');
          editor.setValue('', -1);
          break;
        case 'Page__edit':
          if (data.pages.length === 1) {
            $('#Page__btn__delete').hide();
          } else {
            $('#Page__btn__delete').show();
          }
          $('#Page__field__id').val(this.id);
          $('#Page__field__name').val(this.name);
          editor.setValue(this.content, -1);
          break;
        default:
          console.error('Page_modal:', e.relatedTarget.id);
          break;
      }
    });
    $('#Page__btn__save').click(() => {
      const page = {
        id: Number.parseInt($('#Page__field__id').val()),
        name: $('#Page__field__name').val(),
        content: editor.getValue()
      };
      const newData = { ...data };
      if (page.id === -1) {
        page.id = newData.index + 1;
        newData.index += 1;
        newData.pages.push(page);
      } else {
        for (const key in data.pages) {
          if (newData.pages[key].id === this.id) {
            newData.pages[key] = page;
          }
        }
      }
      BDD.save(newData);
      sessionStorage.setItem('page', page.id);
    });

    $('#Page__btn__delete').click(() => {
      const newData = { ...data };
      newData.pages = newData.pages.filter((page) => page.id !== this.id);
      sessionStorage.setItem('page', newData.pages[0].id);
      BDD.save(newData);
    });
  }
}