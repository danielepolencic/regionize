const div = (cls) => {
  const el = document.createElement('div');
  el.classList.add(cls);
  return el;
};

class Region {
  constructor(elmt) {
    this.element = elmt;
    this.content = div('region-content');
    this.content.style.padding = '0.1px';
    this.content.style.position = 'relative';
    this.element.appendChild(this.content);
    this.path = [];
  }

  setPath(newPath) {
    this.path = newPath;
    if (newPath.length > 0) this.content.appendChild(newPath[0]);
  }

  get currentElement() {
    const len = this.path.length;
    if (len > 0) return this.path[len - 1];
    return this.content;
  }

  get isEmpty() {
    return this.content.textContent.trim() === '' && this.content.offsetHeight < 1;
  }

  get isReasonableSize() {
    const box = this.element.getBoundingClientRect();
    return (box.height > 100) && (box.width > 100); // TODO: Number is arbitrary
  }

  overflowAmount() {
    const contentH = this.content.offsetHeight;
    const boxH = this.element.offsetHeight;
    if (boxH === 0) throw Error('Regionizer: Trying to flow into an element with zero height.');
    return contentH - boxH;
  }

  hasOverflowed() {
    return this.overflowAmount() > -5;
  }
}

export default Region;
