import { Typography } from "@material-tailwind/react";
import React, { useState } from "react";

import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { BiSort } from "react-icons/bi";

const TableHeader = ({ headers, onSorting }) => {
  const [sortingField, setSortingField] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc");

  const onSortingChange = (field) => {
    const order =
      field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

    setSortingField(field);
    setSortingOrder(order);
    onSorting(field, order);
  };

  return (
    <thead>
      <tr>
        {headers.map(({ name, field, sortable }) => (
          <th
            key={name}
            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
            onClick={() => (sortable ? onSortingChange(field) : null)}
          >
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal leading-none opacity-70 flex flex-row items-center"
            >
              {name}

              {sortable && <BiSort className="h-4 w-4" />}
              {sortingField &&
                sortingField === field &&
                (sortingOrder === "asc" ? (
                  <AiFillCaretDown className="h-6 w-6" />
                ) : (
                  <AiFillCaretUp className="h-6 w-6" />
                ))}
            </Typography>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
