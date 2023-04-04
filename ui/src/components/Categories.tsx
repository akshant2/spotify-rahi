import React, { FC } from "react";
import { Category } from "../types";
import { Link } from "react-router-dom";

export const Categories: FC<CategoryType> = function ({ category }) {
  return (
    <div className="overflow-y-auto h-auto px-10 mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-10 lg:grid-cols-6">
      {category.map((category, i) => (
        <div key={i} className="group relative">
          <Link to={`/category/${category.id}`}></Link>
          <div className="h-44 w-44 aspect-w-1 aspect-h-1 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none">
            <img
              src={category.icons[0].url}
              className="h-44 w-44 object-cover object-center"
              alt="Album Image"
            />
          </div>

          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">
                <a
                  href={`${process.env.REACT_APP_DOMAIN}/category/${category.id}`}
                >
                  <span aria-hidden="true" className="absolute inset-0" />
                  {category.name}
                </a>
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

type CategoryType = { category: Category[] };
