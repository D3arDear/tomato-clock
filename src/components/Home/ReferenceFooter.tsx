import React from "react";
import styled from "styled-components";

const Footer = styled.footer`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledA = styled.a`
  color: #666;
  font-size: 12px;
  padding-left: 0.5em;
  text-decoration: none;
  line-height: 1;
`;

const StyledP = styled.p`
  color: #666;
  font-size: 12px;
  padding-right: 0.5em;
  line-height: 1;
`;

const ReferenceFooter = () => {
  return (
    <Footer>
      <StyledP>© brenZ</StyledP>
      <StyledA href="https://beian.miit.gov.cn/">蜀ICP备18039418号</StyledA>
    </Footer>
  );
};

export default ReferenceFooter;
