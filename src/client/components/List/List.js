import React from "react";
import { useSelector } from "react-redux";
import { getBreadcrumb, getNumLocale } from "../../shared/utils";

import Styled from "./List.style";
import ImgFreeShipping from "./images/ic_shipping@2x.png.png.png";

export default () => {
  const {
    root: { list },
  } = useSelector((state) => state);

  if (!list) {
    return <div>No results</div>;
  }

  const len = list.data.items.length;
  const topCats = getBreadcrumb(list.data.categories);

  return (
    <div>
      <Styled.Breadcrumb>
        <div className="breadCrumb">
          {topCats.map((cat, idx) => {
            return (
              <span key={cat}>
                {idx > 0 && " > "}
                {idx === topCats.length - 1 ? (
                  <strong>{cat}</strong>
                ) : (
                  <span>{cat}</span>
                )}
              </span>
            );
          })}
        </div>
      </Styled.Breadcrumb>
      {list.data.items.map((item, idx) => (
        <div key={item.id}>
          <Styled.RowGrid>
            <div
              className={`section contentSection ${idx === 0 ? "first" : ""} ${
                idx === len - 1 ? "last" : ""
              }`}
            >
              <Styled.LeftColumn showTopBorder={idx === 0}>
                <div className="image">
                  <Styled.Image src={item.picture} alt="" />
                </div>
                <Styled.ContentGrid>
                  <div className="currency">{item.price.currency}</div>
                  <div className="amount">
                    {getNumLocale(item.price.amount)}
                  </div>
                  <div className="free_shipping">
                    {item.free_shipping && (
                      <Styled.IconFreeShip src={ImgFreeShipping} alt="" />
                    )}
                  </div>
                  <div className="title">{item.title}</div>
                </Styled.ContentGrid>
              </Styled.LeftColumn>
            </div>
            <div
              className={`section locationSection ${idx === 0 ? "first" : ""} ${
                idx === len - 1 ? "last" : ""
              }`}
            >
              <Styled.RightColumn showTopBorder={idx === 0}>
                {item.city}
              </Styled.RightColumn>
            </div>
          </Styled.RowGrid>
        </div>
      ))}
    </div>
  );
};
