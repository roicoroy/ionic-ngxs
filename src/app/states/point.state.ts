import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
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
        private pointsService: PointsService,
    ) {
    }
    @Selector()
    static getPointsList(state: PointsStateModel) {
        return state.points;
    }
    @Selector()
    static getSelectedWaiter(state: PointsStateModel) {
        return state.selectedPoint;
    }
    @Action(PointActions.Get)
    getPoints({ getState, setState }: StateContext<PointsStateModel>) {
        return this.pointsService.fetchPoints()
            .pipe(tap((result) => {
                const state = getState();
                setState({
                    ...state,
                    points: result,
                });
            }));
    }
    @Action(PointActions.Add)
    addPoint({ getState, patchState }: StateContext<PointsStateModel>, { payload }: PointActions.Add) {
        return this.pointsService.addPoint(payload)
            .pipe(tap((result) => {
                const state = getState();
                patchState({
                    points: [...state.points, result]
                });
            }));
    }

    @Action(PointActions.Update)
    updatePoint(ctx: StateContext<PointsStateModel>, { payload, id }: PointActions.Update) {
        return this.pointsService.updatePoint(payload, id)
            .pipe(
                tap((result) => {
                    console.log(result);
                    const state = ctx.getState();
                    const pointList = [...state.points];
                    const todoIndex = pointList.findIndex((item) => item.id === id);
                    pointList[todoIndex] = result;
                    ctx.setState({
                        ...state,
                        points: pointList,
                    });
                })
            );
    }


    @Action(PointActions.Delete)
    deletePoint({ getState, setState }: StateContext<PointsStateModel>, { id }: PointActions.Delete) {
        return this.pointsService.deletePoint(id)
            .pipe(tap(() => {
                const state = getState();
                const filteredArray = state.points.filter((item) => item.id !== id);
                setState({
                    ...state,
                    points: filteredArray,
                });
            }));
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
