import styled from 'styled-components/macro';
import H from '../Hex';

// calculations don't account for overlapping borders. Math is hard :(
const POINTER_TRANSLATE_MATH = `(100% + 2px)`;

export const Hex = styled(H)`
  top: ${({ theme }) =>
    theme.dimensions.hexOffsetY - theme.dimensions.hexBorder / 1.7}px;
  left: 0;
  z-index: 3;
  will-change: transform;

  &.mapIsActive {
    transform: translate3d(
      ${({ theme }) => theme.dimensions.hexWidth * -1}px,
      0,
      0
    );
  }
`;

export const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate3d(0, -50%, 0);
  height: ${({ theme }) =>
    theme.dimensions.hexBoxHeight - theme.dimensions.hexBorder - 1}px;
  width: ${({ theme }) =>
    theme.dimensions.hexBoxWidth - theme.dimensions.hexBorder}px;
`;

export const Pointer = styled.span`
  display: block;
  position: absolute;
  width: 80%;
  top: calc(50% - 2px);
  left: 0;
  height: 4px;
  transition: ${({ theme }) => theme.timing.baseAnimationTime}ms opacity ease-in,
    ${({ theme }) => theme.timing.baseAnimationTime * 0.6}ms filter ease-in;
  transform-origin: left center;
  transform: scaleX(1) rotate(0);
  background: #fff;
  opacity: 0;
  z-index: 0;
  will-change: transform, filter, opacity;

  .previousHex-start & {
    transition-delay: ${({ theme }) => theme.timing.baseAnimationTime * 0.7}ms;
  }

  &.animating-enter {
    opacity: 0.01;
    filter: blur(8px);
  }

  &.animating-enter-active,
  &.animating-enter-done,
  &.animating-exit {
    opacity: 1;
    filter: blur(0);
  }

  &.animating-exit-active {
    transition: none;
    opacity: 0;
    filter: blur(8px);
  }

  &.pointer-1 {
    transform: rotate(-45deg)
      translate3d(0, calc(${POINTER_TRANSLATE_MATH} * -1), 0);
  }

  &.pointer-2 {
    transform: rotate(0) translate3d(0, 0, 0);
  }

  &.pointer-3 {
    transform: rotate(45deg) translate3d(0, calc(${POINTER_TRANSLATE_MATH}), 0);
  }
`;
