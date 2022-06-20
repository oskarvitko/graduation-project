import { Breadcrumb } from 'components/layout/BreadCrumbs'
import { appSlice } from 'store/reducers/appReducer'
import { useAppDispatch, useAppSelector } from './redux'

type useBreadcrumbsType = {
    breadcrumbs: Breadcrumb[]
    setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void
    replaceLastBreadcrumb: (breadcrumb: Breadcrumb) => void
}

function useBreadcrumbs(): useBreadcrumbsType {
    const { breadcrumbs } = useAppSelector((state) => state.app)
    const dispatch = useAppDispatch()
    const { setBreadcrumbs, replaceLastBreadcrumb } = appSlice.actions

    return {
        breadcrumbs,
        setBreadcrumbs: (breadcrumbs: Breadcrumb[]) =>
            dispatch(setBreadcrumbs(breadcrumbs)),
        replaceLastBreadcrumb: (breadcrumb: Breadcrumb) =>
            dispatch(replaceLastBreadcrumb(breadcrumb)),
    }
}

export default useBreadcrumbs
