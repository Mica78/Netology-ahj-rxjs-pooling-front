import { AjaxResponse } from "rxjs/ajax";
import moment from "moment";

export function addElement(value, container) {
  if (!(value instanceof AjaxResponse)) {
    return;
  }
  for (const message of value.response.messages) {
    const fromUser = message.from;
    const subj = message.subject;
    const received = message.received;
    const valiDate = moment(received).format("HH:mm DD.MM.YYYY");
    const element = document.createElement("div");
    element.classList.add("incoming");
    element.innerHTML = `
      <div class="from">${fromUser}</div>
      <div class="subject">${subj}</div>
      <div class="date">${valiDate}</div>
    `;
    if (container.children.length > 1) {
      container.insertBefore(element, container.firstElementChild.nextSibling);
    } else {
      container.insertAdjacentElement("beforeend", element);
    }
  }
}
