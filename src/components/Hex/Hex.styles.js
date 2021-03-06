import styled from 'styled-components/macro';
import styledDynamicTag from '../../lib/styledDynamicTag';
import { emptyBlock, normalizeButton } from '../../lib/styledUtils';
const activeTransition = `all 150ms ease-in`;

const BEZIER = `cubic-bezier(.17,.24,.04,.99)`;

export const ListItem = styledDynamicTag(styled.li`
  position: absolute;
  margin: 0;
  list-style: none;
  width: ${({ theme }) => theme.dimensions.hexWidth}px;
  height: ${({ theme }) => theme.dimensions.hexHeight}px;
  transition: ${({ theme }) => theme.timing.baseAnimationTime * 3}ms transform
    ${BEZIER};

  &:focus,
  &:focus-within * {
    outline: 0;
  }
`);

export const Img = styled.img`
  ${emptyBlock()}
  transition: ${activeTransition};
  opacity: 1;
  z-index: 2;

  &.animating-enter {
    opacity: 0.01;
  }

  &.animating-enter-active,
  &.animating-exit {
    opacity: 1;
  }

  &.animating-exit-active {
    opacity: 0;
  }
`;

export const HexWrapper = styled.div`
  position: relative;
  margin: 0;
  list-style: none;
  height: 100%;
  width: 100%;

  &:hover:not(.active) ${Img} {
    filter: brightness(140%) saturate(70%);
  }
`;

export const Button = styled.button`
  ${normalizeButton()}
  ${emptyBlock()}
  transition: ${activeTransition};
  background-color: transparent;
  color: #fff;
  z-index: 2;

  &.has-click-handler {
    cursor: pointer;
  }

  &.active {
    color: ${({ theme }) => theme.colors.blueMedium};
  }
`;

export const LabelWrapper = styled.span`
  display: block;
  margin-right: 10px;
  margin-left: 10px;
  padding-top: 10px;
`;

export const NumberWrapper = styled.span`
  display: block;
  position: absolute;
  top: 18px;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  transition: ${activeTransition};
  color: ${({ theme }) => theme.colors.blueLight};
  font-size: 18px;
  text-align: center;
  z-index: 2;

  &.active {
    color: #fff;
  }
`;

export const Clipper = styled.span`
  ${emptyBlock()}
  top: 50%;
  left: -100%;
  width: 150%;
  height: ${({ theme }) => theme.dimensions.pillCalculatedHeight + 2}px;
  background: ${({ theme }) => theme.colors.black};
  transform: translateY(-50%);
  z-index: 1;
`;

const pointerTranslate = 'translate3d(-50%, -50%, 0)';

export const Pointer = styled.span`
  ${emptyBlock('right')}
  right: calc(50% - ${({ theme }) => theme.dimensions.hexBorder}px);
  height: ${({ theme }) => theme.dimensions.hexBorder}px;
  background: #fff;
  transition: transform ${({ theme }) =>
    theme.timing.baseAnimationTime * 0.4}ms ease-in 0.5s;
  transform: scaleX(0);
  transform-origin: center right;
  z-index: 2;

  li:nth-child(1) & {
    top: ${({ theme }) => theme.dimensions.pointerOffset}px;
    transform: ${pointerTranslate} rotate(-30deg) scaleX(0);
    &.active {
      transform: ${pointerTranslate} rotate(-30deg) scaleX(1);
    }
  }

  li:nth-child(2) & {
    top: 50%;
    transform: ${pointerTranslate} scaleX(0);
    &.active {
      transform: ${pointerTranslate} scaleX(1);
    }
  }

  li:nth-child(3) & {
    top: ${({ theme }) =>
      theme.dimensions.hexHeight - theme.dimensions.pointerOffset}px;
    transform: ${pointerTranslate} rotate(30deg) scaleX(0);
    &.active {
      transform: ${pointerTranslate} rotate(30deg) scaleX(1);
    }
  }
`;
