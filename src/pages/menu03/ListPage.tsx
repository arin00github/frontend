import React from "react";
import { ListItem, UnorderedList } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PageBody } from "Layout/PageBody";

export default function ListPage() {
  const subNav: { title: string; url: string }[] = [
    { title: "example01", url: "example01" },
    { title: "example02", url: "example02" },
    { title: "example03", url: "example03" },
  ];

  const renderNav = () => {
    return (
      <UnorderedList>
        {subNav.map((navlist, idx) => (
          <ListItem key={`map_example_${idx}`} h="45px" lineHeight="45px">
            <Link to={navlist.url}>{navlist.title}</Link>
          </ListItem>
        ))}
      </UnorderedList>
    );
  };

  return <PageBody>{renderNav()}</PageBody>;
}
