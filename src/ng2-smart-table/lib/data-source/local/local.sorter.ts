export class LocalSorter {

  protected static COMPARE = (direction: any, a: any, b: any) => {
    if (a < b) {
      return -1 * direction;
    }
    if (a > b) {
      return direction;
    }
    return 0;
  }

  static sort(data: Array<any>, field: string, direction: string, customCompare?: Function): Array<any> {

    const dir: number = (direction === 'asc') ? 1 : -1;
    const compare: Function = customCompare ? customCompare : this.COMPARE;

    return data.sort((a, b) => {
      let Adata: any = a;
      let Bdata: any = b;

      const propertyList: string[] = field.split(".");
      for(const property of propertyList) {
        Adata = Adata[property];
      }

      for(const property of propertyList) {
        Bdata = Bdata[property];
      }
      const Avalue = typeof Adata === 'undefined' || Adata === null ? '' : Adata;
      const Bvalue = typeof Bdata === 'undefined' || Bdata === null ? '' : Bdata;


      return compare.call(null, dir, Avalue, Bvalue);
    });
  }
}
