import { json } from 'stream/consumers';
import * as bTemplate from '../models/blobTemplate.json'
import * as cosmosDb from '../models/cosmosData.json'


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
    /* id and feilds are availabel... need to match feilds */
    var filterTemplate: blobTemp = bTemplate;

    let resObj: any = {};
    let chkItem: Array<ChecklistItem> = [];
    for (let i = 0; i < matchedListItemsIds.length; i++) {

        var itemId = matchedListItemsIds[i].id;
        var items = bTemplate.checklistItems.filter(x => x.id == itemId);
        chkItem.push(items[0]);

        for (let index = 0; index < chkItem.length; index++) {
            for (let j = 0; j < chkItem[index].checklistItemFields.length; j++) {
                chkItem[index].checklistItemFields[j].value = 
                getAppendItemsFields(chkItem[index].checklistItemFields[j].id, itemId).value;
            }

        }

    }

    resObj.version = bTemplate.version;
    resObj.status = bTemplate.status;
    resObj.templateId = bTemplate.templateId;
    resObj.description = bTemplate.description;
    resObj.title = bTemplate.title;
    resObj.checkListId = bTemplate.checkListId
    resObj.checklistItems = chkItem;

    console.log(matchedListItemsIds);
    console.log(listItemsId);
    return JSON.stringify(resObj);

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