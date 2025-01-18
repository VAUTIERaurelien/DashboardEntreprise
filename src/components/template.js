class TemplateService {
  static render(element, props) {
    return $(element).text().split(/\$\{(.+?)\}/g).map(
      (tok, i) => (i % 2) ? props[tok] : tok
    ).join('');
  }
}