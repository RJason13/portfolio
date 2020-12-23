import { Toolbar } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { navbarHeight } from "utils/ui";

const BaseToolbar = styled(Toolbar)<{ component: keyof HTMLElementTagNameMap }>`
    justify-content: space-between;
    & > li {
        
        list-style: none;
        
        &> * {
            height: ${({ theme })=>navbarHeight(theme)};
            transition: opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
            opacity: 0.8;

            &:not(.active):hover {
                opacity: 10;
            }
        }
    }
`;

export const StyledNavLink = styled(NavLink)`
    -webkit-tap-highlight-color: transparent;
    height: ${({ theme })=>navbarHeight(theme)};
    line-height: ${({ theme })=>navbarHeight(theme)};
    text-decoration: none;
    color: white;
    display: flex;
    align-items: center;

    &.active {
        opacity: 0.56;
    }
`;

export default BaseToolbar;