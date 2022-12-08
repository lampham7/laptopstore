import { createSelector } from "@reduxjs/toolkit";
export const sidebarStatusSelector = state=>state.sideBar.isOpen
export const overlayStatusSelector = state=>state.overlay.isOpen
export const getRoleId = state=>state.user.roleId
export const getBrands = state=>state.brands
export const getCarts = state=>state.user.carts