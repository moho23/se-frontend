import {EnglishCategoryToPersian} from "./translateCategory";

export const TreeData = [
    {
        title: EnglishCategoryToPersian['interesting_places'],
        key: 'interesting_places',
        id: '1',
        children: [
            {
                title: EnglishCategoryToPersian['religion'],
                key: 'religion',
                id: '1.0'
            },
            {
                title: EnglishCategoryToPersian['cultural'],
                key: 'cultural',
                id: '1.1'
            },
            {
                title: EnglishCategoryToPersian['historic'],
                key: 'historic',
                id: '1.2'
            },
            {
                title: EnglishCategoryToPersian['industrial_facilities'],
                key: 'industrial_facilities',
                id: '1.3'
            },
            {
                title: EnglishCategoryToPersian['natural'],
                key: 'natural',
                id: '1.4'
            },
            {
                title: EnglishCategoryToPersian['other'],
                key: 'other',
                id: '1.5'
            },
        ],
    },
    {
        title: EnglishCategoryToPersian['tourist_facilities'],
        key: 'tourist_facilities',
        id: '2',
        children: [
            {
                title: EnglishCategoryToPersian['transport'],
                key: 'transport',
                id: '2.0',
                children: [
                    {
                        title: EnglishCategoryToPersian['car_rental'],
                        key: 'car_rental',
                        id: '2.0.0',
                    },
                    {
                        title: EnglishCategoryToPersian['car_sharing'],
                        key: 'car_sharing',
                        id: '2.0.1',
                    },
                    {
                        title: EnglishCategoryToPersian['car_wash'],
                        key: 'car_wash',
                        id: '2.0.2',
                    },
                    {
                        title: EnglishCategoryToPersian['bicycle_rental'],
                        key: 'bicycle_rental',
                        id: '2.0.3',
                    },
                    {
                        title: EnglishCategoryToPersian['boat_sharing'],
                        key: 'boat_sharing',
                        id: '2.0.4',
                    },
                    {
                        title: EnglishCategoryToPersian['fuel'],
                        key: 'fuel',
                        id: '2.0.5',
                    },
                ],
            },
            {
                title: EnglishCategoryToPersian['shops'],
                key: 'shops',
                id: '2.1',
            },
            {
                title: EnglishCategoryToPersian['foods'],
                key: 'foods',
                id: '2.2',
                children: [
                    {
                        title: EnglishCategoryToPersian['restaurants'],
                        key: 'restaurants',
                        id: '2.2.0',
                    },
                    {
                        title: EnglishCategoryToPersian['cafes'],
                        key: 'cafes',
                        id: '2.2.1',
                    },
                    {
                        title: EnglishCategoryToPersian['fast_food'],
                        key: 'fast_food',
                        id: '2.2.2',
                    },
                    {
                        title: EnglishCategoryToPersian['food_courts'],
                        key: 'food_courts',
                        id: '2.2.3',
                    },
                ],
            },
            {
                title: EnglishCategoryToPersian['banks'],
                key: 'banks',
                id: '2.3',
            },
        ],
    },
    {
        title: EnglishCategoryToPersian['sport'],
        key: 'sport',
        id: '3',
    },
    {
        title: EnglishCategoryToPersian['amusements'],
        key: 'amusements',
        id: '4',
    },
    {
        title: EnglishCategoryToPersian['accomodations'],
        key: 'accomodations',
        id: '5',
    },
];