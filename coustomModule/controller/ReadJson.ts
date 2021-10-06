import * as bTemplate from '../models/blobTemplate.json'
import * as cosmosDb from '../models/cosmosData.json'
import axios from 'axios'

import { RxHR } from '@akanass/rx-http-request';
import { map } from 'rxjs/operators';
import { async, Observable } from 'rxjs';
import { resolve } from 'path/posix';
import { response } from 'express';

export interface Pokedex {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: Datum[];
    support: Support;
}

export interface Datum {
    id: number;
    name: string;
    year: number;
    color: string;
    pantone_value: string;
}

export interface Support {
    url: string;
    text: string;
}


export interface blobTemp {
    checkListId: string;
    status: string;
    title: string;
    description: string;
    templateId: string;
    version: string;
    checklistItems: ChecklistItem[];
}

export interface ChecklistItem {
    id: string;
    title: string;
    description: string;
    checklistItemFields: ChecklistItemField[];
}

export interface ChecklistItemField {
    id: string;
    description: string;
    type: string;
    required: boolean;
    displayOrder: number;
    value?: string;
}


interface checklistItemFieldsModel {
    id: string,
    value: string
}



export const modifyBlobTemplete = () => {

    var listItemsId = bTemplate.checklistItems.map((item) => {
        return item.id;
    });

    const matchedListItemsIds = getValidateListItems(listItemsId);
    var filterTemplate: blobTemp = {
        checkListId: bTemplate.checkListId,
        status: bTemplate.status,
        title: bTemplate.title,
        description: bTemplate.description,
        templateId: bTemplate.templateId,
        version: bTemplate.version,
        checklistItems: []
    };

    for (let i = 0; i < matchedListItemsIds.length; i++) {

        var itemId = matchedListItemsIds[i].id;
        var items = bTemplate.checklistItems.filter(x => x.id == itemId);

        if (items.length > 0) {
            filterTemplate.checklistItems.push(items[0])

            for (let j = 0; j < filterTemplate.checklistItems[i].checklistItemFields.length; j++) {
                filterTemplate.checklistItems[i].checklistItemFields[j].value =
                    getAppendItemsFields(filterTemplate.checklistItems[i].checklistItemFields[j].id, itemId).value;
            }
        }
    }

    return JSON.stringify(filterTemplate);
}

const getValidateListItems = (listItemIds: string[]) => {

    var matchedIds = cosmosDb.checklistItems.filter(x => listItemIds.includes(x.id))
    return matchedIds;
}

const getAppendItemsFields = (fid: string, itemId: string) => {

    let ItemFieldsModel: checklistItemFieldsModel = {
        id: fid,
        value: 'null'
    };

    cosmosDb.checklistItems.
        filter(x => x.id === itemId)
        .map((i) => {
            var result = i.checklistItemFields.filter(r => r.id === fid);

            for (let i = 0; i < result.length; i++) {
                ItemFieldsModel = result[i];

            }
        });

    return ItemFieldsModel;
}

export const dummyAsyncImplementation = async () => {

    let value: Pokedex;
    value = await fectchJsonAsync();
    return JSON.stringify(value);
}

const api = 'https://reqres.in/api/user'
const fectchJsonAsync = async (): Promise<Pokedex> => {
    
    const response = RxHR.get<Pokedex>(`${api}`, { json: true });
    return new Promise((resolve, reject) => {
        response.subscribe((data) => {
            resolve(data.body);
        });
    })

    
   
}

export const getfromAxios= async () => {
   let val =  await axioget();
   return JSON.stringify(val.data);
}


async function axioget() : Promise<Pokedex> {
    let result: Pokedex = await axios.get(`${api}`);
    return result;
} 