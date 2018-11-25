declare namespace Clime {
    interface Constructor<T> {
      new (...args: any[]): T;
    }
  
    interface Dictionary<T> {
      [key: string]: T;
    }
  }
  