const contents = [];
class Site {
  constructor() {
    this.version = '1.2';
    this.theme = data.theme;
    this.addon = data.addon;
    this.colorTheme = Site.defineColorTheme(this.theme);
    $('body').attr('data-bs-theme', this.colorTheme);
    this.modal();
    this.footer();
    new Page();
    for (const className of contents) {
      eval(className).demo();
    }
    for (const className of contents) {
      const classNameInstance = eval(className);
      new classNameInstance();
    }
  }

  modal() {
    const editor = ace.edit("Site__field__addon");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/html");
    editor.session.setTabSize(2);
    editor.setShowPrintMargin(false);
    $("#Site__field__theme").change(() => {
      $('body').attr('data-bs-theme', Site.defineColorTheme($("#Site__field__theme").val()));
    });
    $('#Site_modal').on('hide.bs.modal', (e) => {
      $('body').attr('data-bs-theme', Site.defineColorTheme(this.colorTheme));
    });
    $('#Site_modal').on('show.bs.modal', (e) => {
      for (const option of $("#Site__field__theme").children()) {
        $(option).attr('selected', false);
        if (this.theme === $(option).val()) $(option).attr('selected', true);
      }
      editor.setValue(this.addon, -1);
    });
    $('#Site__btn__save').click(() => {
      const newData = { ...data };
      newData.theme = $("#Site__field__theme").val();
      newData.addon = editor.getValue();
      BDD.save(newData);
    });
  }

  async footer() {
    const dateRefraish = new Date().setHours(new Date().getHours() - 1);
    const lastupdate = Number.parseInt(localStorage.getItem('git.dataFreshness'));
    if (!lastupdate || dateRefraish > lastupdate) await this.getLastReleaseGIT();
    this.git = {
      dataFreshness: localStorage.getItem('git.dataFreshness'),
      url: localStorage.getItem('git.url'),
      text: localStorage.getItem('git.text'),
      color: localStorage.getItem('git.color')
    };
    $('#version').append(TemplateService.render('script[data-template="footer"]', this.git));
  }

  async getLastReleaseGIT() {
    const gitRes = await $.getJSON("https://api.github.com/repos/VAUTIERaurelien/DashboardEntreprise/releases");
    localStorage.setItem('git.dataFreshness', new Date().getTime());
    let url = gitRes[0].html_url;
    let text = `Version ${this.version}`;
    let color = 'info';
    if (gitRes[0].tag_name > this.version) {
      text = `New version available - Current version ${this.version}`;
      color = 'success';
    };
    if (gitRes[0].tag_name < this.version) {
      text = `Version ${this.version} (BETA)`;
      color = 'warning';
      url = 'https://github.com/VAUTIERaurelien/DashboardEntreprise/tree/prod';
    };
    localStorage.setItem('git.text', text);
    localStorage.setItem('git.color', color);
    localStorage.setItem('git.url', url);
  }

  static defineColorTheme(theme) {
    return theme === 'auto' ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' : theme;
  }
}

$(document).ready(() => {
  contents.push('Markdown');
  contents.push('BtnLinkDropdown');
  contents.push('BtnLink');
  contents.push('Separation');
  contents.push('BootstrapTableBlock');
  contents.push('CopyBlock')
  $('html').append(data.addon);
  new Site();
  $(document).keydown((e) => { if (e.ctrlKey && e.key === 's') e.preventDefault(); });
  $('img').on('error', (e) => $(e.currentTarget).attr('src', 'src/assets/favicon.ico'));
});