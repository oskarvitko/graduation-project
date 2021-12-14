import { SET_MATERIALS } from "../types/material-type"

import oaipURL from './images/oaip.png'
import vvsURL from './images/vvs.png'
import vvs2URL from './images/vvs2.png'
import swpURL from './images/swp.png'
import swp2URL from './images/swp2.png'
import bdURL from './images/bd.png'
import logURL from './images/log.png'
import marURL from './images/mar.png'
import menURL from './images/men.png'

const initialState = {
    materials: [
        {
            title: 'Введение в специальность: Учебная программа для специальности 1-40 01 01 Программное обеспечение информационных технологий',
            author: 'Гедранович В.В.',
            isBookmark: false,
            downloaded: 425,
            watched: 525,
            id: '1',
            subject: 'Введение в специальность',
            faculty: 'Коммуникаций и информационных технологий',
            donwloadLink: 'http://miu.by/rus/kaf_fik/kaf_download/33635_202687208.zip',
            link: 'http://miu.by/rus/kaf_fik/kaf_download/33635_202687208.pdf',
            pages: 16,
            img: vvsURL
        },
        {
            title: 'Лекция 1 (презентация)',
            author: 'Гедранович В.В.',
            isBookmark: false,
            downloaded: 234,
            watched: 433,
            id: '2',
            subject: 'Введение в специальность',
            faculty: 'Коммуникаций и информационных технологий',
            donwloadLink: 'http://miu.by/rus/kaf_fik/kaf_download/30005_192027946.zip',
            link: 'http://miu.by/rus/kaf_fik/kaf_download/30005_192027946.pdf',
            pages: 6,
            img: vvs2URL
        },
        {
            title: 'Учебная программа для специальности 1-40 01 01 Программное обеспечение информационных технологий',
            author: 'Лаврёнов А.Н.',
            isBookmark: false,
            downloaded: 234,
            watched: 433,
            id: '3',
            subject: 'Создание web-приложений',
            faculty: 'Коммуникаций и информационных технологий',
            donwloadLink: 'http://miu.by/rus/kaf_kit/kaf_download/34561_200442007.zip',
            link: 'http://miu.by/rus/kaf_kit/kaf_download/34561_200442007.pdf',
            pages: 32,
            img: swpURL
        },
        {
            title: 'Онлайн-обучение, группа 161701з. Лекция 03. (10-я неделя)',
            author: 'Лаврёнов А.Н.',
            isBookmark: true,
            downloaded: 65,
            watched: 132,
            id: '4',
            subject: 'Создание web-приложений',
            faculty: 'Коммуникаций и информационных технологий',
            donwloadLink: 'http://miu.by/rus/kaf_kit/kaf_download/34566_200654820.zip',
            link: 'http://miu.by/rus/kaf_kit/kaf_download/34566_200654820.pdf',
            pages: 49,
            img: swp2URL
        },
        {
            title: 'Учебная программа по дисциплине для специальности 1-40 01 01 Программное обеспечение информационных технологий',
            author: 'Змеева Ю.В.',
            isBookmark: false,
            downloaded: 11,
            watched: 48,
            id: '5',
            subject: 'Базы данных',
            faculty: 'Коммуникаций и информационных технологий',
            donwloadLink: 'http://miu.by/rus/kaf_kit/kaf_download/34341_200089784.zip',
            link: 'http://miu.by/rus/kaf_kit/kaf_download/34341_200089784.pdf',
            pages: 26,
            img: bdURL
        },
        {
            title: 'Электронный УМК по дисциплине Логистика',
            author: 'Саевич Е.А.',
            isBookmark: true,
            downloaded: 574,
            watched: 574,
            id: '6',
            subject: 'Логистика',
            faculty: 'Права и экономики',
            faculty: 'Коммуникаций и информационных технологий',
            donwloadLink: 'http://miu.by/rus/kaf_eup/kaf_download/35519_192900598.zip',
            link: 'http://miu.by/rus/kaf_eup/kaf_download/35519_192900598.pdf',
            pages: 29,
            img: logURL
        },
        {
            title: 'Электронный УМК',
            author: 'Ковалева Н.Л.',
            isBookmark: false,
            downloaded: 234,
            watched: 433,
            id: '7',
            subject: 'Маркетинг',
            faculty: 'Права и экономики',
            donwloadLink: 'http://miu.by/rus/kaf_eup/kaf_download/35544_199524575.zip',
            link: 'http://miu.by/rus/kaf_eup/kaf_download/35544_199524575.pdf',
            pages: 43,
            img: marURL
        },
        {
            title: 'Основы алгоритмизации и программирования',
            author: 'Демидович Е.М., Змеева Ю.В.',
            isBookmark: false,
            downloaded: 630,
            watched: 748,
            id: '8',
            subject: 'Основы алгоритмизации и программирования',
            faculty: 'Коммуникаций и информационных технологий',
            img: oaipURL,
            pages: 22,
            link: 'http://miu.by/rus/kaf_kit/kaf_download/31419_200102781.pdf',
            donwloadLink: 'http://miu.by/rus/kaf_kit/kaf_download/31419_200102781.zip'
        },
        {
            title: 'Информация по выполнению курсовых работ',
            author: 'Ковалева Н.Л.',
            isBookmark: false,
            downloaded: 516,
            watched: 687,
            id: '9',
            subject: 'Менеджмент',
            faculty: 'Права и экономики',
            donwloadLink: 'http://miu.by/rus/kaf_eup/kaf_download/35573_200688266.zip',
            link: 'http://miu.by/rus/kaf_eup/kaf_download/35573_200688266.pdf',
            pages: 1,
            img: menURL
        },
    ]
}

export const materialReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case SET_MATERIALS:
            return {
                ...state,
                materials: payload
            }

        default: return state
    }
}