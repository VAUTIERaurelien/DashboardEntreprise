class Content {
  constructor() {}
  static demo(){}
}

class Demo {
  static get(id) {
    Markdown.demo(id);
    BtnLink.demo(id);
    Separation.demo(id);
    BootstrapTableBlock.demo(id);
  }
}

class Markdown extends Content {
  constructor() {
    super();
    for (const element of $('.md')) {
      if (!$(element).parents('code').length) {
        const content = $(marked.parse(element.innerHTML)
          .replaceAll(/<ol/g, '<ol class="list-group list-group-numbered"')
          .replaceAll(/<ul/g, '<ul class="list-group"')
          .replaceAll(/<li/g, '<li class="list-group-item"'));
        content.addClass(element.className);
        $(element).replaceWith(content);
      }
    }
  }

  static demo(parentId = 'Demo__container') {
    $(`#${parentId}`).append(`
       <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#${parentId}Markdown"
            aria-expanded="true" aria-controls="${parentId}Markdown">
            Markdown
          </button>
        </h2>
        <div id="${parentId}Markdown" class="accordion-collapse collapse show" data-bs-parent="#${parentId}">
          <div class="accordion-body">
            <pre class="md">
To use markdown use this \`<pre class="md"></pre>\`
\`\`\`html
<pre class="md">To use markdown use this \`<pre class="md"></pre>\`</pre>
\`\`\`
            </pre>
          </div>
        </div>
      </div>`);
  }
}

class BtnLinkDropdown extends Content {
  constructor() {
    super();
    for (const element of $('btnlinkdropdown')) {
      if (!$(element).parents('code').length) {
        let favicon = $(element).attr('favicon');
        $(element).replaceWith(`
          <div class="col ${element.className} mt-3">
            <div class="Link bg-light border rounded">
              <div class="row">
                <div class="col">
                  <div class="row Link__card dropdown">
                    <img class="mx-2 Link__img" src="${favicon}">
                    <div class="col d-flex align-items-center justify-content-center px-0 text-dark">
                      <button class="btnlinkdropdown dropdown-toggle  dropdown-toggle-split" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        ${$(element).attr('label')} <span class="visually-hidden justify-content-end">Toggle Dropdown</span>
                      </button>
                      ${element.innerHTML}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`);
      }
    }
  }

  static demo(parentId = 'Demo__container') {
    $(`#${parentId}`).append(`
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${parentId}BtnLinkDropdown"
            aria-expanded="false" aria-controls="${parentId}BtnLinkDropdown">
            Btn Link Dropdown
          </button>
        </h2>
        <div id="${parentId}BtnLinkDropdown" class="accordion-collapse collapse" data-bs-parent="#${parentId}">
          <div class="accordion-body">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5">
                <btnlinkdropdown class="col mb-3" label="Btn Link Dropdown">
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" target="_blank" href="https://getbootstrap.com/docs/5.3/getting-started/introduction/">Bootstrap</a></li>
                    <li><a class="dropdown-item" target="_blank" href="https://github.com/VAUTIERaurelien/DashboardEntreprise">DashboardEntreprise</a></li>
                  </ul>
                </btnlinkdropdown>
            </div>
            <pre class="md">
\`\`\`html
<div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5">
  <btnlinkdropdown class="col mb-3" label="Btn Link Dropdown">
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" target="_blank" href="https://getbootstrap.com/docs/5.3/getting-started/introduction/">Bootstrap</a></li>
      <li><a class="dropdown-item" target="_blank" href="https://github.com/VAUTIERaurelien/DashboardEntreprise">DashboardEntreprise</a></li>
    </ul>
  </btnlinkdropdown>
</div>
\`\`\`
            </pre>
          </div>
        </div>
      </div>`);
  }
}

class BtnLink extends Content {
  constructor() {
    super();
    for (const element of $('btnlink')) {
      if (!$(element).parents('code').length) {
        let favicon = $(element).attr('favicon');
        if (!favicon) {
          const domain = $(element).attr('href').split('/')[2];
          favicon = `https://${domain}/favicon.ico`;
        }
        $(element).replaceWith(`
          <div class="col ${element.className} mt-3">
            <div class="Link bg-light border rounded">
              <div class="row">
                <div class="col">
                  <a href="${$(element).attr('href')}" target="${$(element).attr('target')}">
                    <div class="row Link__card">
                      <img class="mx-2 Link__img" src="${favicon}">
                      <div class="col d-flex align-items-center justify-content-center px-0 text-dark">${element.innerHTML}</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>`);
      }
    }
  }

  static demo(parentId = 'Demo__container') {
    $(`#${parentId}`).append(`
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${parentId}BtnLink"
            aria-expanded="false" aria-controls="${parentId}BtnLink">
            Btn Link
          </button>
        </h2>
        <div id="${parentId}BtnLink" class="accordion-collapse collapse" data-bs-parent="#${parentId}">
          <div class="accordion-body">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5">
              <btnlink class="col mb-3" href="https://getbootstrap.com/docs/5.3/getting-started/introduction/"
                taget="_blank">
                Bootstrap
              </btnlink>
              <btnlink class="col mb-3" href="https://github.com/VAUTIERaurelien/DashboardEntreprise" taget="_blank">
                DashboardEntreprise
              </btnlink>
              <btnlink class="col mb-3" href="setFavicon" favicon="src/assets/favicon.ico" taget="_blank">
                Set favicon
              </btnlink>
            </div>
            <pre class="md">
\`\`\`html
<div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5">
  <btnlink class="col mb-3" href="https://getbootstrap.com/docs/5.3/getting-started/introduction/" taget="_blank">Bootstrap</btnlink>
  <btnlink class="col mb-3" href="https://github.com/VAUTIERaurelien/DashboardEntreprise" taget="_blank">DashboardEntreprise</btnlink>
  <btnlink class="col mb-3" href="setFavicon" favicon="src/assets/favicon.ico" taget="_blank">Set favicon</btnlink>
</div>
\`\`\`
            </pre>
          </div>
        </div>
      </div>`);
  }
}

class Separation extends Content {
  constructor() {
    super();
    for (const element of $('separation')) {
      if (!$(element).parents('code').length) {
        $(element).replaceWith(`
        <div class="row ${element.className}" id="${element.id}">
          ${element.className.includes('center') | element.className.includes('end') ? '<div class="col"><hr></div>' : ''}
          <div class="col-auto"><h4>${element.innerHTML}</h4></div>
          ${element.className.includes('center') | element.className.includes('start') ? '<div class="col"><hr></div>' : ''}
        </div>`);
      };
    }
  }

  static demo(parentId = 'Demo__container') {
    $(`#${parentId}`).append(`
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${parentId}Separation"
            aria-expanded="false" aria-controls="${parentId}Separation">
            Separation
          </button>
        </h2>
        <div id="${parentId}Separation" class="accordion-collapse collapse" data-bs-parent="#${parentId}">
          <div class="accordion-body">
            <div class="row">
              <div class="col">
                <separation>Separation</separation>
                <separation class="start">Separation</separation>
                <separation class="center">Separation</separation>
                <separation class="end">Separation</separation>
              </div>
              <div class="col">
                <pre class="md">
\`\`\`html
<separation>Separation</separation>
<separation class="start">Separation</separation>
<separation class="center">Separation</separation>
<separation class="end">Separation</separation>
\`\`\`
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>`);
  }
}

class BootstrapTableBlock extends Content {
  constructor() { super(); }

  static demo(parentId = 'Demo__container') {
    const params = {
      data: [
        {
          col1: "value 1 col 1",
          col2: "value 1 col 2"
        },
        {
          col1: "value 2 col 1",
          col2: "value 2 col 2"
        },
        {
          col1: "value 3 col 1",
          col2: "value 3 col 2"
        },
        {
          col1: "value 4 col 1",
          col2: "value 4 col 2"
        },
        {
          col1: "value 5 col 1",
          col2: "value 5 col 2"
        },
        {
          col1: "value 6 col 1",
          col2: "value 6 col 2"
        },
        {
          col1: "value 7 col 1",
          col2: "value 7 col 2"
        },
        {
          col1: "value 8 col 1",
          col2: "value 8 col 2"
        },
        {
          col1: "value 9 col 1",
          col2: "value 9 col 2"
        },
        {
          col1: "value 10 col 1",
          col2: "value 10 col 2"
        },
        {
          col1: "value 11 col 1",
          col2: "value 11 col 2"
        },
        {
          col1: "value 12 col 1",
          col2: "value 12 col 2"
        },
        {
          col1: "value 13 col 1",
          col2: "value 13 col 2"
        },
        {
          col1: "value 14 col 1",
          col2: "value 14 col 2"
        },
        {
          col1: "value 15 col 1",
          col2: "value 15 col 2"
        },
        {
          col1: "value 16 col 1",
          col2: "value 16 col 2"
        }
      ],
      columns: [
        {
          title: "col 1",
          field: "col1",
          sortable: true,
          filterControl: "input"
        },
        {
          title: "col 2",
          field: "col2",
          sortable: true,
          filterControl: "input"
        }
      ],
      pagination: true,
      filterControl: true,
    };

    $(`#${parentId}`).append(`
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${parentId}Table"
            aria-expanded="false" aria-controls="${parentId}Table">
            Table
          </button>
        </h2>
        <div id="${parentId}Table" class="accordion-collapse collapse" data-bs-parent="#${parentId}">
          <div class="accordion-body">
            <div class="card mb-3">
              <div class="card-header">
                Go see the <a href="https://bootstrap-table.com/docs/getting-started/introduction/">bootstrap table</a>
                documentation
              </div>
              <div class="card-body">
                <table id="${parentId}BtTable"></table>
              </div>
            </div>
            <pre class='md'>
\`\`\`html
<table id="${parentId}BtTableDemo"></table>
<script>
  $(document).ready(() => {
    $('#${parentId}BtTableDemo').bootstrapTable(
      ${JSON.stringify(params, null, '  ')}
    );
  })
</script>
\`\`\`
            </pre>
          </div>
        </div>
      </div>`);
    $(`#${parentId}BtTable`).bootstrapTable(params);
  }
}

class CopyBlock extends Content {
  constructor() {
    super();
    window.Prism = window.Prism || {};
    Prism.manual = true;
    for (const element of $('pre')) {
      try {
        const code = $(element).children('code')[0];
        const btn = $(`<button class="btn btn-outline-secondary"><i class="bi bi-clipboard"></i></button>`);
        btn.click(() => CopyBlock.copyCode(btn, code.innerText));
        $(element).prepend(btn);
      } catch (error) { }
    }
    Prism.highlightAll();
  }

  static async copyCode(btn, content) {
    await navigator.clipboard.writeText(content);
    btn.html('<i class="bi bi-check-lg"></i>');
    setTimeout(() => { btn.html('<i class="bi bi-clipboard"></i>'); }, 700);
  }
}
