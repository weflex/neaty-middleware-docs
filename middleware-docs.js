'use strict';

class MiddlewareDocs {
  constructor(options) {
    this.title = options.title || 'Neaty Middleware Docs';
    this.routers = options.routers;
    this.contents = [];
  }
  writeTitle() {
    this.contents.push(
      '# ' + this.title
    );
  }
  writeRouters() {
    for (let name in this.routers) {
      let router = this.routers[name];
      let content = [
        '### ' + name,
      ];
      if (router.description) {
        content.push('> ' + router.description);
      }
      if (router.paths) {
        content.push(
          'This middleware is on the following URIs:\n' +
          router.paths.map((pathname) => {
            return '- `' + pathname + '`';
          }).join('\n')
        );
      }
      if (router.methods) {
        content.push(
          'And it only accepts the following methods:\n' +
          router.methods.map((method) => {
            return '- ' + method;
          }).join('\n')
        );
      } else {
        content.push(
          'And it accepts any methods of HTTP:\n' +
          '- GET\n' +
          '- POST'
        );
      }
      this.contents.push(content.join('\n\n'));
    }
  }
  render() {
    this.writeTitle();
    this.writeRouters();
    return this.contents.join('\n\n');
  }
}

module.exports = MiddlewareDocs;