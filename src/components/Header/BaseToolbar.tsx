import { Toolbar } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { navbarHeight } from "utils/ui";

const BaseToolbar = styled(Toolbar)<{ component: keyof HTMLElementTagNameMap }>`
    justify-content: space-between;
    & > li {
        height: ${({ theme })=>navbarHeight(theme)};
        list-style: none;
        transition: opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
        opacity: 0.8;

        &:hover {
            opacity: 10;
        }
    }
`;

export const StyledNavLink = styled(NavLink)`
    height: ${({ theme })=>navbarHeight(theme)};
    line-height: ${({ theme })=>navbarHeight(theme)};
    text-decoration: none;
    color: white;
    display: flex;
    align-items: center;
`;

export default BaseToolbar;