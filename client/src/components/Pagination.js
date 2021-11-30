import "./Pagination.css"

const Pagination = ( {facilitiesPerPage, totalFacilities, paginate }) => {
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(totalFacilities / facilitiesPerPage); i++) {
        pageNumber.push(i);
    }

    return (
        <div className="pagination-cntr">
            <ul className="pagination-ul">
                {pageNumber.map(number => (
                    <li key={number}>
                        <a className="page-num" onClick={() => paginate(number)} href="#">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Pagination
