import { Injectable } from '@angular/core';
import { Paginator } from './../../models/paginator.model';

@Injectable()
export class PaginateService {

  paginateData(totalCount: number, limit: number, offset: number): Paginator {
    const pages: number[] = []; // stores the page numbers of the results
    const totalPages: number = Math.ceil(totalCount / limit);
    const currentPage = this.findPage(totalPages, limit, offset);
    if (currentPage < 1) {
      return;
    }
    // display all pages if the total pages are less or equal to 10
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // adjust pagination numbers for large pages
      for (let startPage = (currentPage - 4),
        i = startPage > 0 ? startPage : 1,
        tempEnd = currentPage + 5,
        endPage = tempEnd <= totalPages ? tempEnd : totalPages;
        i <= endPage; i++) {
        pages.push(i);
      }
    }
    return <Paginator>{
      totalPages: totalPages,
      currentPage: currentPage,
      pages: pages
    };
  }

  findPage(pages: number, limit: number, offset: number): number {
    for (let i = 1; i <= pages; i++) {
      if (offset < (limit * i)) {
        return i;
      }
    }
    return;
  }

  getOffset(page: number, limit: number, currentPage: number): number {
    let offset: number;
    switch (page) {
      case -1:
        offset = ((currentPage - 2) * limit);
        break;
      case 0:
        offset = ((currentPage) * limit);
        break;
      default:
        offset = ((page - 1) * limit);
        break;
    }
    if (!offset || offset < 0) {
      offset = 0; // avoid negative offsets
    }
    return offset;
  }

}
