const pagination = document.querySelector('.pagination');
export function paginationRender(actualPage, totalPages) {
  /*Pagination DOM build*/
  const actual = document.createElement('button');
  actual.setAttribute('type', 'button');
  actual.textContent = actualPage;
  actual.classList.add('pagination__button');
  actual.classList.add('pagination__button--actual');
  pagination.append(actual);
  const actualPlus1 = document.createElement('button');
  actualPlus1.setAttribute('type', 'button');
  actualPlus1.classList.add('pagination__button');
  actualPlus1.textContent = actualPage + 1;
  const actualPlus2 = document.createElement('button');
  actualPlus2.setAttribute('type', 'button');
  actualPlus2.classList.add('pagination__button');
  actualPlus2.textContent = actualPage + 2;
  const actualMinus1 = document.createElement('button');
  actualMinus1.setAttribute('type', 'button');
  actualMinus1.classList.add('pagination__button');
  actualMinus1.textContent = actualPage - 1;
  const actualMinus2 = document.createElement('button');
  actualMinus2.setAttribute('type', 'button');
  actualMinus2.classList.add('pagination__button');
  actualMinus2.textContent = actualPage - 2;
  const nextPage = document.createElement('button');
  nextPage.setAttribute('type', 'button');
  nextPage.classList.add('pagination__button');
  nextPage.classList.add('pagination__button--next');
  nextPage.dataset.page = actualPage + 1;
  const previousPage = document.createElement('button');
  previousPage.setAttribute('type', 'button');
  previousPage.classList.add('pagination__button');
  previousPage.classList.add('pagination__button--previous');
  previousPage.dataset.page = actualPage - 1;
  const firstPage = document.createElement('button');
  firstPage.setAttribute('type', 'button');
  firstPage.textContent = 1;
  firstPage.classList.add('pagination__button');
  firstPage.classList.add('pagination__button--hideAbility');
  const lastPage = document.createElement('button');
  lastPage.setAttribute('type', 'button');
  lastPage.textContent = totalPages;
  lastPage.classList.add('pagination__button');
  lastPage.classList.add('pagination__button--hideAbility');
  const nextBetween = document.createElement('button');
  nextBetween.setAttribute('type', 'button');
  nextBetween.textContent = '...';
  nextBetween.classList.add('pagination__button');
  nextBetween.classList.add('pagination__button--hideAbility');
  nextBetween.classList.add('pagination__button--deactive');
  const previousBetween = document.createElement('button');
  previousBetween.setAttribute('type', 'button');
  previousBetween.textContent = '...';
  previousBetween.classList.add('pagination__button');
  previousBetween.classList.add('pagination__button--hideAbility');
  previousBetween.classList.add('pagination__button--deactive');
  /*Buttons appending*/
  if (actualPage === 1) {
    if (totalPages > actualPage) {
      pagination.append(actualPlus1);
    }
    if (totalPages > actualPlus1.textContent) {
      pagination.append(actualPlus2);
    }
    if (totalPages > actualPlus2.textContent) {
      pagination.append(nextBetween);
      pagination.append(lastPage);
    }
    if (totalPages > actualPage) {
      pagination.append(nextPage);
    }
  }
  if (actualPage === 2) {
    if (totalPages > actualPage) {
      pagination.append(actualPlus1);
    }
    if (totalPages > actualPlus1.textContent) {
      pagination.append(actualPlus2);
    }
    if (totalPages > actualPlus2.textContent) {
      pagination.append(nextBetween);
      pagination.append(lastPage);
    }
    if (totalPages > actualPage) {
      pagination.append(nextPage);
    }
    pagination.prepend(actualMinus1);
    pagination.prepend(previousPage);
  }
  if (actualPage > 2) {
    if (totalPages > actualPage) {
      pagination.append(actualPlus1);
    }
    if (totalPages > actualPlus1.textContent) {
      pagination.append(actualPlus2);
    }
    if (totalPages > actualPlus2.textContent) {
      pagination.append(nextBetween);
      pagination.append(lastPage);
    }
    if (totalPages > actualPage) {
      pagination.append(nextPage);
    }
    pagination.prepend(actualMinus1);
    pagination.prepend(actualMinus2);
    if (actualPage > 3) {
      pagination.prepend(previousBetween);
      pagination.prepend(firstPage);
    }
    pagination.prepend(previousPage);
  }
}
export function paginationDestroy() {
  pagination.replaceChildren();
}
