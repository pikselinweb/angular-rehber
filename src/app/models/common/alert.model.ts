export interface ALERTDATA {
  title:string;
  body:string;
  confirmButtonText?:string;
  cancelButtonText?:string;
  confirmButtonColor?:string;
  cancelButtonColor?:string;
  hideCancelButton?:boolean;
  data?:any;
}

export interface ALERTRESULT{
  accepted:boolean;
  data?:any;
}
