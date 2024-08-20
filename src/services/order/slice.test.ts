import orderReducer, { IOrderState, resetOrder } from './slice';

import { order } from '../../../testData';
import { postOrder } from './action';
import { TNewOrderResponse } from '@api';

describe('Тесты синхронных экшенов', () => {
  test('Проверяем очистку заказа', () => {
    const initialState: IOrderState = {
      order: null,
      name: null,
      error: null,
      isLoading: false,
      orders: [],
      orderModal: [],
      profileOrders: [],
      total: null,
      totalToday: null
    };

    const newOrder = orderReducer(initialState, resetOrder());
    expect(newOrder).toEqual({
      order: null,
      name: null,
      error: null,
      isLoading: false,
      orders: [],
      orderModal: [],
      profileOrders: [],
      total: null,
      totalToday: null
    });
  });
});

describe('Тесты асинхронных экшенов', () => {
  describe('Тестируем postOrder', () => {
    test('Тестируем отправку запроса (pending)', async () => {
      const initialState: IOrderState = {
        order: null,
        name: null,
        error: null,
        isLoading: false,
        orders: [],
        orderModal: [],
        profileOrders: [],
        total: null,
        totalToday: null
      };

      const newState = orderReducer(
        initialState,
        postOrder.pending('pending', order.ingredients)
      );

      expect(newState.isLoading).toBeTruthy();
      expect(newState.error).toBeNull();
    });
    test('Тестируем ошибку при запросе (rejected)', async () => {
      const initialState: IOrderState = {
        order: null,
        name: null,
        error: null,
        isLoading: true,
        orders: [],
        orderModal: [],
        profileOrders: [],
        total: null,
        totalToday: null
      };

      const error: Error = {
        name: 'rejected',
        message: 'Ошибка отправки заказа'
      };
      const newState = orderReducer(
        initialState,
        postOrder.rejected(error, 'rejected', order.ingredients)
      );

      expect(newState.isLoading).toBeFalsy();
      expect(newState.error).toBe(error.message);
    });
    test('Тестируем успешный запрос (fulfilled)', async () => {
      const initialState: IOrderState = {
        order: null,
        name: null,
        error: null,
        isLoading: true,
        orders: [],
        orderModal: [],
        profileOrders: [],
        total: null,
        totalToday: null
      };

      const newOrder: TNewOrderResponse = {
        order: order,
        name: 'new order',
        success: true
      };

      const newState = orderReducer(
        initialState,
        postOrder.fulfilled(newOrder, 'fulfilled', order.ingredients)
      );

      expect(newState.order).toEqual(order);
      expect(newState.isLoading).toBeFalsy();
      expect(newState.error).toBeNull();
    });
  });
});
