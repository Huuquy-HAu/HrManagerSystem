import React from 'react'
import { Pagination, PaginationItem } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { ReactComponent as First } from "../../../scss/First.svg";
import { ReactComponent as Next } from "../../../scss/Next.svg";
import { ReactComponent as Previous } from "../../../scss/Previous.svg";
import { ReactComponent as Last } from "../../../scss/Last.svg";

interface Props {
  dataEmployee: any,
  setPage(page:number):void,
  query: any
}

export const PaginationEmployee = (props: Props) => {
  const { dataEmployee , setPage , query } = props
  const nav = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();


  function getQueryParams(queryString:any) {
    const queryParams:any = {};
    const params = queryString.slice(1).split('&');
  
    for (let param of params) {
      const [key, value] = param.split('=');
      queryParams[key] = value;
    }
  
    return queryParams;
  }

  
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
    ) => {
    let objSearch = getQueryParams(location.search)
    setPage(page)
    nav(`/employee?${objSearch.search ? "search=" + objSearch.search + "&page=" + page : `page=${page}`}` )
  };
  
  return (
    <div className="flex items-center h-55 gap-2.5">
      <Pagination
        onChange={handleChangePage}
        count={dataEmployee.last_page}
        shape="rounded"
        showFirstButton
        showLastButton
        onClick={() => handleChangePage}
        renderItem={(item) => (
          <PaginationItem
            slots={{
              first: () => <First />,
              previous: () => <Previous />,
              next: () => <Next />,
              last: () => <Last />,
            }}
            sx={{
              height: "35px",
              width: "48px",
              "&.MuiPaginationItem-root:not(.MuiPaginationItem-firstLast, .MuiPaginationItem-previousNext, .MuiPaginationItem-ellipsis)":
                {
                  backgroundColor: "rgb(241, 243, 245)",
                  color: "rgb(104, 112, 118)",
                },
              "&.MuiPaginationItem-root.Mui-selected": {
                background: "rgb(230, 232, 235)",
                color: "rgb(17, 24, 28)",
                fontWeight: "600",
              },
            }}
            {...item}
          />
        )}
      />
      <div className="h-9 bg-gray2 py-2 px-3 rounded-md text-sm text-gray">
        {dataEmployee.from} - {dataEmployee.to} of{" "}
        {dataEmployee.total}
      </div>
    </div>
  )
}