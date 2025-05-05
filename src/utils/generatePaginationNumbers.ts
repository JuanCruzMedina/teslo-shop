export const generatePaginationNumbers = (
    currentPage: number,
    totalPages: number,
    maxVisiblePages: number = 5
) => {
    const paginationNumbers: (number | string)[] = [];
    const halfMaxVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfMaxVisible);
    let endPage = Math.min(totalPages, currentPage + halfMaxVisible);

    if (endPage - startPage < maxVisiblePages - 1) {
        if (startPage === 1) {
            endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        } else {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        paginationNumbers.push(i);
    }

    if (startPage > 1) {
        paginationNumbers.unshift("...");
        paginationNumbers.unshift(1);
    }

    if (endPage < totalPages) {
        paginationNumbers.push("...");
        paginationNumbers.push(totalPages);
    }

    return paginationNumbers;
}