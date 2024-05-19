import { repeat } from "rxjs/operators";
import { map, catchError, of } from "rxjs";
import { ajax } from "rxjs/ajax";

import { addElement } from "./add_element";

const request$ = ajax({
  url: "http://localhost:7000/messages/unread",
  crossDomain: true,
  method: "GET",
}).pipe(
  map((response) => response),
  catchError((error) => {
    return of(error);
  }),
  repeat({ delay: 10000 }),
);

request$.subscribe((value) =>
  addElement(value, document.querySelector(".container")),
);
