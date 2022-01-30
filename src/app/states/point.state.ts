import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { PointActions } from '../actions/point.action';
import { Point } from '../models/point.type';
import { PointsService, POINTS_LIST_KEY } from '../services/points.service';
import { Storage } from '@ionic/storage-angular';
export class PointsStateModel {
    points: Point[];
    selectedPoint: Point;
}

@State<PointsStateModel>({
    name: 'points',
    defaults: {
        points: [],
        selectedPoint: null
    }
})
@Injectable()
export class PointsState {
    constructor(
        private storage: Storage,
        private pointsService: PointsService,
    ) {
    }
    @Selector()
    static getPointsList(state: PointsStateModel) {
        return state.points;
    }
    @Selector()
    static getSelectedPoint(state: PointsStateModel) {
        return state.selectedPoint;
    }
    @Action(PointActions.Get)
    getPoints({ getState, setState }: StateContext<PointsStateModel>) {
        return this.pointsService.getItems()
            .then((result: Point[]) => {
                if (result) {
                    const state = getState();
                    setState({
                        ...state,
                        points: result,
                    });
                    return this.storage.set(POINTS_LIST_KEY, result);
                }
            });
    }
    @Action(PointActions.Add)
    addPoint({ getState, patchState }: StateContext<PointsStateModel>, { payload }: PointActions.Add) {
        const updateState = payload;
        return this.pointsService.addItem(payload).then(() => {
            const state = getState();
            patchState({
                points: [...state.points, updateState]
            });
        });
    }

    @Action(PointActions.Update)
    updatePoint(ctx: StateContext<PointsStateModel>, { payload, id }: PointActions.Update) {
        console.log(payload, id);
        return this.pointsService.updateItem(payload).then((result) => {
            // console.log(result);
            const state = ctx.getState();
            const pointList = [...state.points];
            const todoIndex = pointList.findIndex((item) => item.id === id);
            pointList[todoIndex] = payload;
            ctx.setState({
                ...state,
                points: pointList,
            });
        });
    }


    @Action(PointActions.Delete)
    deletePoint({ getState, setState }: StateContext<PointsStateModel>, { id }: PointActions.Delete) {
        return this.pointsService.deleteItem(id).then(() => {
            const state = getState();
            const filteredArray = state.points.filter((item) => item.id !== id);
            setState({
                ...state,
                points: filteredArray,
            });
        });
    }

    @Action(PointActions.SetSelected)
    setSelectedPointId({ getState, setState }: StateContext<any>, { payload }: PointActions.SetSelected) {
        const state = getState();
        setState({
            ...state,
            selectedPoint: payload
        });
    }
}
