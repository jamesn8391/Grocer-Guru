import Modal from '../components/Modal.vue';
import { fetchShoppingResults } from '../services/ShoppingService';
import { queryChatGPT } from '../services/ChatGPTService';
import { calibrationQueryHelper } from '../utils/CalibrationResponseHelper';

export default await (async () => {
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');

const __VLS_componentsOption = {};

let __VLS_name!: 'HomeView';
function __VLS_template() {
let __VLS_ctx!: InstanceType<__VLS_PickNotAny<typeof __VLS_internalComponent, new () => {}>> & {};
/* Components */
let __VLS_otherComponents!: NonNullable<typeof __VLS_internalComponent extends { components: infer C; } ? C : {}> & typeof __VLS_componentsOption;
let __VLS_own!: __VLS_SelfComponent<typeof __VLS_name, typeof __VLS_internalComponent & (new () => { $slots: typeof __VLS_slots; })>;
let __VLS_localComponents!: typeof __VLS_otherComponents & Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
let __VLS_components!: typeof __VLS_localComponents & __VLS_GlobalComponents & typeof __VLS_ctx;
/* Style Scoped */
type __VLS_StyleScopedClasses = {} &
{ 'font-size-lg'?: boolean; } &
{ 'bg-color'?: boolean; } &
{ 'container'?: boolean; } &
{ 'btn'?: boolean; };
let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
/* CSS variable injection */
/* CSS variable injection end */
let __VLS_resolvedLocalAndGlobalComponents!: {} &
__VLS_WithComponent<'Modal', typeof __VLS_localComponents, "Modal", "Modal", "Modal">;
__VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div;
__VLS_intrinsicElements.img;
__VLS_intrinsicElements.h1; __VLS_intrinsicElements.h1;
__VLS_intrinsicElements.br;
__VLS_intrinsicElements.button; __VLS_intrinsicElements.button; __VLS_intrinsicElements.button; __VLS_intrinsicElements.button;
__VLS_intrinsicElements.h2; __VLS_intrinsicElements.h2;
__VLS_intrinsicElements.input;
__VLS_components.Modal;
// @ts-ignore
[Modal,];
{
const __VLS_0 = __VLS_intrinsicElements["div"];
const __VLS_1 = __VLS_elementAsFunctionalComponent(__VLS_0);
const __VLS_2 = __VLS_1({ ...{}, class: ("container mb-5"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_0, typeof __VLS_2> & Record<string, unknown>) => void)({ ...{}, class: ("container mb-5"), });
const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2)!;
let __VLS_4!: __VLS_NormalizeEmits<typeof __VLS_3.emit>;
{
const __VLS_5 = __VLS_intrinsicElements["div"];
const __VLS_6 = __VLS_elementAsFunctionalComponent(__VLS_5);
const __VLS_7 = __VLS_6({ ...{}, class: ("row bg-color"), }, ...__VLS_functionalComponentArgsRest(__VLS_6));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_5, typeof __VLS_7> & Record<string, unknown>) => void)({ ...{}, class: ("row bg-color"), });
const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7)!;
let __VLS_9!: __VLS_NormalizeEmits<typeof __VLS_8.emit>;
{
const __VLS_10 = __VLS_intrinsicElements["div"];
const __VLS_11 = __VLS_elementAsFunctionalComponent(__VLS_10);
const __VLS_12 = __VLS_11({ ...{}, class: ("col"), }, ...__VLS_functionalComponentArgsRest(__VLS_11));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_10, typeof __VLS_12> & Record<string, unknown>) => void)({ ...{}, class: ("col"), });
const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12)!;
let __VLS_14!: __VLS_NormalizeEmits<typeof __VLS_13.emit>;
{
const __VLS_15 = __VLS_intrinsicElements["img"];
const __VLS_16 = __VLS_elementAsFunctionalComponent(__VLS_15);
const __VLS_17 = __VLS_16({ ...{}, alt: ("Background"), src: ("@/assets/background.jpg"), style: ({}), }, ...__VLS_functionalComponentArgsRest(__VLS_16));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_15, typeof __VLS_17> & Record<string, unknown>) => void)({ ...{}, alt: ("Background"), src: ("@/assets/background.jpg"), style: ({}), });
const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17)!;
let __VLS_19!: __VLS_NormalizeEmits<typeof __VLS_18.emit>;
}
(__VLS_13.slots!).default;
}
{
const __VLS_20 = __VLS_intrinsicElements["div"];
const __VLS_21 = __VLS_elementAsFunctionalComponent(__VLS_20);
const __VLS_22 = __VLS_21({ ...{}, class: ("col"), }, ...__VLS_functionalComponentArgsRest(__VLS_21));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_20, typeof __VLS_22> & Record<string, unknown>) => void)({ ...{}, class: ("col"), });
const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22)!;
let __VLS_24!: __VLS_NormalizeEmits<typeof __VLS_23.emit>;
{
const __VLS_25 = __VLS_intrinsicElements["div"];
const __VLS_26 = __VLS_elementAsFunctionalComponent(__VLS_25);
const __VLS_27 = __VLS_26({ ...{}, class: ("container mt-5 pt-5 text-center"), }, ...__VLS_functionalComponentArgsRest(__VLS_26));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_25, typeof __VLS_27> & Record<string, unknown>) => void)({ ...{}, class: ("container mt-5 pt-5 text-center"), });
const __VLS_28 = __VLS_pickFunctionalComponentCtx(__VLS_25, __VLS_27)!;
let __VLS_29!: __VLS_NormalizeEmits<typeof __VLS_28.emit>;
{
const __VLS_30 = __VLS_intrinsicElements["h1"];
const __VLS_31 = __VLS_elementAsFunctionalComponent(__VLS_30);
const __VLS_32 = __VLS_31({ ...{}, class: ("h1"), }, ...__VLS_functionalComponentArgsRest(__VLS_31));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_30, typeof __VLS_32> & Record<string, unknown>) => void)({ ...{}, class: ("h1"), });
const __VLS_33 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32)!;
let __VLS_34!: __VLS_NormalizeEmits<typeof __VLS_33.emit>;
{
const __VLS_35 = __VLS_intrinsicElements["br"];
const __VLS_36 = __VLS_elementAsFunctionalComponent(__VLS_35);
const __VLS_37 = __VLS_36({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_36));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_35, typeof __VLS_37> & Record<string, unknown>) => void)({ ...{}, });
const __VLS_38 = __VLS_pickFunctionalComponentCtx(__VLS_35, __VLS_37)!;
let __VLS_39!: __VLS_NormalizeEmits<typeof __VLS_38.emit>;
}
(__VLS_33.slots!).default;
}
{
const __VLS_40 = __VLS_intrinsicElements["button"];
const __VLS_41 = __VLS_elementAsFunctionalComponent(__VLS_40);
const __VLS_42 = __VLS_41({ ...{ onClick: {} as any, }, class: ("btn btn-secondary mt-3"), }, ...__VLS_functionalComponentArgsRest(__VLS_41));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_40, typeof __VLS_42> & Record<string, unknown>) => void)({ ...{ onClick: {} as any, }, class: ("btn btn-secondary mt-3"), });
const __VLS_43 = __VLS_pickFunctionalComponentCtx(__VLS_40, __VLS_42)!;
let __VLS_44!: __VLS_NormalizeEmits<typeof __VLS_43.emit>;
let __VLS_45 = { 'click': __VLS_pickEvent(__VLS_44['click'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_41, typeof __VLS_42>).onClick) };
__VLS_45 = { click: (__VLS_ctx.toggleGroceryList) };
(__VLS_43.slots!).default;
}
(__VLS_28.slots!).default;
}
(__VLS_23.slots!).default;
}
(__VLS_8.slots!).default;
}
{
const __VLS_46 = __VLS_intrinsicElements["div"];
const __VLS_47 = __VLS_elementAsFunctionalComponent(__VLS_46);
const __VLS_48 = __VLS_47({ ...{}, class: ("row justify-content-center"), }, ...__VLS_functionalComponentArgsRest(__VLS_47));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_46, typeof __VLS_48> & Record<string, unknown>) => void)({ ...{}, class: ("row justify-content-center"), });
const __VLS_49 = __VLS_pickFunctionalComponentCtx(__VLS_46, __VLS_48)!;
let __VLS_50!: __VLS_NormalizeEmits<typeof __VLS_49.emit>;
if (__VLS_ctx.showGroceryList && !__VLS_ctx.isLoading) {
{
const __VLS_51 = __VLS_intrinsicElements["div"];
const __VLS_52 = __VLS_elementAsFunctionalComponent(__VLS_51);
const __VLS_53 = __VLS_52({ ...{}, class: ("col-5 mt-3 pt-5 text-center"), }, ...__VLS_functionalComponentArgsRest(__VLS_52));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_51, typeof __VLS_53> & Record<string, unknown>) => void)({ ...{}, class: ("col-5 mt-3 pt-5 text-center"), });
const __VLS_54 = __VLS_pickFunctionalComponentCtx(__VLS_51, __VLS_53)!;
let __VLS_55!: __VLS_NormalizeEmits<typeof __VLS_54.emit>;
{
const __VLS_56 = __VLS_intrinsicElements["h2"];
const __VLS_57 = __VLS_elementAsFunctionalComponent(__VLS_56);
const __VLS_58 = __VLS_57({ ...{}, class: ("h2"), }, ...__VLS_functionalComponentArgsRest(__VLS_57));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_56, typeof __VLS_58> & Record<string, unknown>) => void)({ ...{}, class: ("h2"), });
const __VLS_59 = __VLS_pickFunctionalComponentCtx(__VLS_56, __VLS_58)!;
let __VLS_60!: __VLS_NormalizeEmits<typeof __VLS_59.emit>;
(__VLS_59.slots!).default;
}
for (const [searchBar, index] of __VLS_getVForSourceType((__VLS_ctx.searchBars)!)) {
{
const __VLS_61 = __VLS_intrinsicElements["div"];
const __VLS_62 = __VLS_elementAsFunctionalComponent(__VLS_61);
const __VLS_63 = __VLS_62({ ...{}, key: ((index)), class: ("form-outline my-4"), }, ...__VLS_functionalComponentArgsRest(__VLS_62));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_61, typeof __VLS_63> & Record<string, unknown>) => void)({ ...{}, key: ((index)), class: ("form-outline my-4"), });
const __VLS_64 = __VLS_pickFunctionalComponentCtx(__VLS_61, __VLS_63)!;
let __VLS_65!: __VLS_NormalizeEmits<typeof __VLS_64.emit>;
{
const __VLS_66 = __VLS_intrinsicElements["input"];
const __VLS_67 = __VLS_elementAsFunctionalComponent(__VLS_66);
const __VLS_68 = __VLS_67({ ...{ onKeydown: {} as any, }, ref: ("inputFields"), type: ("search"), id: (('form' + index)), class: ("form-control"), placeholder: (('Enter Grocery Item ' + (index + 1))), "aria-label": ("Search"), }, ...__VLS_functionalComponentArgsRest(__VLS_67));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_66, typeof __VLS_68> & Record<string, unknown>) => void)({ ...{ onKeydown: {} as any, }, ref: ("inputFields"), type: ("search"), id: (('form' + index)), class: ("form-control"), placeholder: (('Enter Grocery Item ' + (index + 1))), "aria-label": ("Search"), });
const __VLS_69 = __VLS_pickFunctionalComponentCtx(__VLS_66, __VLS_68)!;
let __VLS_70!: __VLS_NormalizeEmits<typeof __VLS_69.emit>;
(__VLS_ctx.groceryItems[index]);
// @ts-ignore
(__VLS_ctx.inputFields);
let __VLS_71 = { 'keydown': __VLS_pickEvent(__VLS_70['keydown'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_67, typeof __VLS_68>).onKeydown) };
__VLS_71 = {
keydown: $event => {
if (!((__VLS_ctx.showGroceryList && !__VLS_ctx.isLoading))) return;
__VLS_ctx.addSearchBar(index);
// @ts-ignore
[toggleGroceryList, showGroceryList, isLoading, searchBars, groceryItems, inputFields, addSearchBar,];
}
};
}
(__VLS_64.slots!).default;
}
}
{
const __VLS_72 = __VLS_intrinsicElements["button"];
const __VLS_73 = __VLS_elementAsFunctionalComponent(__VLS_72);
const __VLS_74 = __VLS_73({ ...{ onClick: {} as any, }, class: ("btn btn-success mx-5"), }, ...__VLS_functionalComponentArgsRest(__VLS_73));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_72, typeof __VLS_74> & Record<string, unknown>) => void)({ ...{ onClick: {} as any, }, class: ("btn btn-success mx-5"), });
const __VLS_75 = __VLS_pickFunctionalComponentCtx(__VLS_72, __VLS_74)!;
let __VLS_76!: __VLS_NormalizeEmits<typeof __VLS_75.emit>;
let __VLS_77 = { 'click': __VLS_pickEvent(__VLS_76['click'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_73, typeof __VLS_74>).onClick) };
__VLS_77 = { click: (__VLS_ctx.search) };
(__VLS_75.slots!).default;
}
(__VLS_54.slots!).default;
}
// @ts-ignore
[search,];
}
if (__VLS_ctx.isLoading) {
{
const __VLS_78 = __VLS_intrinsicElements["div"];
const __VLS_79 = __VLS_elementAsFunctionalComponent(__VLS_78);
const __VLS_80 = __VLS_79({ ...{}, class: ("spinner-border mt-5"), role: ("status"), }, ...__VLS_functionalComponentArgsRest(__VLS_79));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_78, typeof __VLS_80> & Record<string, unknown>) => void)({ ...{}, class: ("spinner-border mt-5"), role: ("status"), });
const __VLS_81 = __VLS_pickFunctionalComponentCtx(__VLS_78, __VLS_80)!;
let __VLS_82!: __VLS_NormalizeEmits<typeof __VLS_81.emit>;
}
// @ts-ignore
[isLoading,];
}
(__VLS_49.slots!).default;
}
if (__VLS_ctx.showModal) {
{
const __VLS_83 = __VLS_intrinsicElements["div"];
const __VLS_84 = __VLS_elementAsFunctionalComponent(__VLS_83);
const __VLS_85 = __VLS_84({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_84));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_83, typeof __VLS_85> & Record<string, unknown>) => void)({ ...{}, });
const __VLS_86 = __VLS_pickFunctionalComponentCtx(__VLS_83, __VLS_85)!;
let __VLS_87!: __VLS_NormalizeEmits<typeof __VLS_86.emit>;
{
const __VLS_88 = ({} as 'Modal' extends keyof typeof __VLS_ctx ? { 'Modal': typeof __VLS_ctx.Modal; } : typeof __VLS_resolvedLocalAndGlobalComponents).Modal;
const __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({ ...{}, calibrationResults: ((__VLS_ctx.shoppingResults)), selectedItems: ((__VLS_ctx.selectedItems)), finalChatQuery: ((__VLS_ctx.finalChatQuery)), }));
({} as { Modal: typeof __VLS_88; }).Modal;
const __VLS_90 = __VLS_89({ ...{}, calibrationResults: ((__VLS_ctx.shoppingResults)), selectedItems: ((__VLS_ctx.selectedItems)), finalChatQuery: ((__VLS_ctx.finalChatQuery)), }, ...__VLS_functionalComponentArgsRest(__VLS_89));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_88, typeof __VLS_90> & Record<string, unknown>) => void)({ ...{}, calibrationResults: ((__VLS_ctx.shoppingResults)), selectedItems: ((__VLS_ctx.selectedItems)), finalChatQuery: ((__VLS_ctx.finalChatQuery)), });
const __VLS_91 = __VLS_pickFunctionalComponentCtx(__VLS_88, __VLS_90)!;
let __VLS_92!: __VLS_NormalizeEmits<typeof __VLS_91.emit>;
}
(__VLS_86.slots!).default;
}
// @ts-ignore
[showModal, shoppingResults, selectedItems, finalChatQuery, shoppingResults, selectedItems, finalChatQuery, shoppingResults, selectedItems, finalChatQuery,];
}
(__VLS_3.slots!).default;
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
__VLS_styleScopedClasses["container"];
__VLS_styleScopedClasses["mb-5"];
__VLS_styleScopedClasses["row"];
__VLS_styleScopedClasses["bg-color"];
__VLS_styleScopedClasses["col"];
__VLS_styleScopedClasses["col"];
__VLS_styleScopedClasses["container"];
__VLS_styleScopedClasses["mt-5"];
__VLS_styleScopedClasses["pt-5"];
__VLS_styleScopedClasses["text-center"];
__VLS_styleScopedClasses["h1"];
__VLS_styleScopedClasses["btn"];
__VLS_styleScopedClasses["btn-secondary"];
__VLS_styleScopedClasses["mt-3"];
__VLS_styleScopedClasses["row"];
__VLS_styleScopedClasses["justify-content-center"];
__VLS_styleScopedClasses["col-5"];
__VLS_styleScopedClasses["mt-3"];
__VLS_styleScopedClasses["pt-5"];
__VLS_styleScopedClasses["text-center"];
__VLS_styleScopedClasses["h2"];
__VLS_styleScopedClasses["form-outline"];
__VLS_styleScopedClasses["my-4"];
__VLS_styleScopedClasses["form-control"];
__VLS_styleScopedClasses["btn"];
__VLS_styleScopedClasses["btn-success"];
__VLS_styleScopedClasses["mx-5"];
__VLS_styleScopedClasses["spinner-border"];
__VLS_styleScopedClasses["mt-5"];
}
var __VLS_slots!: {};
return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
setup() {
return {
Modal: Modal as typeof Modal,
};
},

data() {
return {
isLoading: false,
showGroceryList: false,
showModal: false,
searchBars: [],
groceryItems: [],
shoppingResults: [],
calibrationResults: [],
selectedItems: [],
};
},
methods: {
toggleGroceryList() {
this.showGroceryList = !this.showGroceryList;
if (this.showGroceryList) {
this.addSearchBar();
}
},
addSearchBar(index) {
const newIndex = this.searchBars.length;
this.searchBars.push({ id: newIndex });
this.groceryItems.push('');
this.$nextTick(() => {
const nextIndex = index + 1;
if (nextIndex < this.$refs.inputFields.length) {
this.$refs.inputFields[nextIndex].focus();
}
});
},
search() {
this.shoppingResults = [];
this.isLoading = true;

Promise.all(
this.groceryItems.map(item => fetchShoppingResults(item))
)
.then(async (results) => {
this.shoppingResults = results;
// console.log(this.shoppingResults);
// Wait for CalibrateChatGPT to complete before setting isLoading to false
//this.calibrationResults = await this.CalibrateChatGPT();
this.isLoading = false;
this.showModal = true; // fix this when merging
})
.catch(error => {
this.isLoading = false;
console.error('Error:', error);
});
},

async finalChatQuery() {
let remainingResults = this.shoppingResults.slice();
remainingResults.splice(0, 3);
console.log(this.shoppingResults.splice(3) + 'okokok');
removeThumbnails(this.shoppingResults.splice(3));
var query = "A user chose these three items: " + this.selectedItems.join('; ') + ". With the following prices: " + this.findItemPrice(this.selectedItems).join('; ') + ". And from these stores: " + this.findItemStore(this.selectedItems).join('; ') + ". Given this JSON filled with different options of Groceries for different items. Find the best deal for each Grocery Item. Return the data as a JSON with only one item for each grocery.\n " + "provide the name of the store that they should go based on their previous selections." + JSON.stringify(this.shoppingResults.slice(3));
console.log(query);
console.log(query.length);
const result = await queryChatGPT(query);
console.log(result["message"]);
},

findItemPrice(items) {
var prices = [];
for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
for (let i = 0; i < this.shoppingResults.length; i++) {
for (let objectIndex = 0; objectIndex < this.shoppingResults[i].length; objectIndex++) {
if (this.shoppingResults[i][objectIndex].title === items[itemIndex]) {
prices.push(this.shoppingResults[i][objectIndex].price);
}
}
}
}
return prices;
},

findItemStore(items) {
var stores = [];
for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
for (let i = 0; i < this.shoppingResults.length; i++) {
for (let objectIndex = 0; objectIndex < this.shoppingResults[i].length; objectIndex++) {
if (this.shoppingResults[i][objectIndex].title === items[itemIndex]) {
stores.push(this.shoppingResults[i][objectIndex].source);
}
}
}
}
return stores;
},

removeThumbnails(items) {
const itemsCopy = structuredClone(items);
console.log(items);
console.log(itemsCopy);
for (let i = 0; i < itemsCopy.length; i++) {
console.log("ok1");
for (let objectIndex = 0; objectIndex < itemsCopy[i].length; objectIndex++) {
console.log("ok");
delete this.itemsCopy[i][objectIndex].thumbnail;
console.log(this.itemsCopy[i][objectIndex].thumbnail);
}
}
return itemsCopy;
},

async CalibrateChatGPT() {
try {
var calibrationResult = [];

for (let i = 0; i < 3; i++) {
var item = this.groceryItems[i];
var query = "You are a price-conscious buyer and are trying to hunt for the best grocery store deals given a set of data. Given the following JSON, determine the best 3 deals when a customer is requesting " + item + " on their grocery list. Format your response as the JSON with only the top 3 results included. Keep all the JSON data the same. \n";
query += JSON.stringify(this.shoppingResults[i]);
console.log(query);

const result = await queryChatGPT(query);
var JSONstring = result["message"];
console.log(calibrationQueryHelper(JSONstring));

calibrationResult.push(calibrationQueryHelper(JSONstring));
}
return calibrationResult;

} catch (error) {
console.error(error);
console.log(this.shoppingResults.map(innerList => innerList.slice(0, 3)));
return { "error": "loser" };
}
},
},
});
return (await import('vue')).defineComponent({
setup() {
return {};
},

data() {
return {
isLoading: false,
showGroceryList: false,
showModal: false,
searchBars: [],
groceryItems: [],
shoppingResults: [],
calibrationResults: [],
selectedItems: [],
};
},
methods: {
toggleGroceryList() {
this.showGroceryList = !this.showGroceryList;
if (this.showGroceryList) {
this.addSearchBar();
}
},
addSearchBar(index) {
const newIndex = this.searchBars.length;
this.searchBars.push({ id: newIndex });
this.groceryItems.push('');
this.$nextTick(() => {
const nextIndex = index + 1;
if (nextIndex < this.$refs.inputFields.length) {
this.$refs.inputFields[nextIndex].focus();
}
});
},
search() {
this.shoppingResults = [];
this.isLoading = true;

Promise.all(
this.groceryItems.map(item => fetchShoppingResults(item))
)
.then(async (results) => {
this.shoppingResults = results;
// console.log(this.shoppingResults);
// Wait for CalibrateChatGPT to complete before setting isLoading to false
//this.calibrationResults = await this.CalibrateChatGPT();
this.isLoading = false;
this.showModal = true; // fix this when merging
})
.catch(error => {
this.isLoading = false;
console.error('Error:', error);
});
},

async finalChatQuery() {
let remainingResults = this.shoppingResults.slice();
remainingResults.splice(0, 3);
console.log(this.shoppingResults.splice(3) + 'okokok');
removeThumbnails(this.shoppingResults.splice(3));
var query = "A user chose these three items: " + this.selectedItems.join('; ') + ". With the following prices: " + this.findItemPrice(this.selectedItems).join('; ') + ". And from these stores: " + this.findItemStore(this.selectedItems).join('; ') + ". Given this JSON filled with different options of Groceries for different items. Find the best deal for each Grocery Item. Return the data as a JSON with only one item for each grocery.\n " + "provide the name of the store that they should go based on their previous selections." + JSON.stringify(this.shoppingResults.slice(3));
console.log(query);
console.log(query.length);
const result = await queryChatGPT(query);
console.log(result["message"]);
},

findItemPrice(items) {
var prices = [];
for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
for (let i = 0; i < this.shoppingResults.length; i++) {
for (let objectIndex = 0; objectIndex < this.shoppingResults[i].length; objectIndex++) {
if (this.shoppingResults[i][objectIndex].title === items[itemIndex]) {
prices.push(this.shoppingResults[i][objectIndex].price);
}
}
}
}
return prices;
},

findItemStore(items) {
var stores = [];
for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
for (let i = 0; i < this.shoppingResults.length; i++) {
for (let objectIndex = 0; objectIndex < this.shoppingResults[i].length; objectIndex++) {
if (this.shoppingResults[i][objectIndex].title === items[itemIndex]) {
stores.push(this.shoppingResults[i][objectIndex].source);
}
}
}
}
return stores;
},

removeThumbnails(items) {
const itemsCopy = structuredClone(items);
console.log(items);
console.log(itemsCopy);
for (let i = 0; i < itemsCopy.length; i++) {
console.log("ok1");
for (let objectIndex = 0; objectIndex < itemsCopy[i].length; objectIndex++) {
console.log("ok");
delete this.itemsCopy[i][objectIndex].thumbnail;
console.log(this.itemsCopy[i][objectIndex].thumbnail);
}
}
return itemsCopy;
},

async CalibrateChatGPT() {
try {
var calibrationResult = [];

for (let i = 0; i < 3; i++) {
var item = this.groceryItems[i];
var query = "You are a price-conscious buyer and are trying to hunt for the best grocery store deals given a set of data. Given the following JSON, determine the best 3 deals when a customer is requesting " + item + " on their grocery list. Format your response as the JSON with only the top 3 results included. Keep all the JSON data the same. \n";
query += JSON.stringify(this.shoppingResults[i]);
console.log(query);

const result = await queryChatGPT(query);
var JSONstring = result["message"];
console.log(calibrationQueryHelper(JSONstring));

calibrationResult.push(calibrationQueryHelper(JSONstring));
}
return calibrationResult;

} catch (error) {
console.error(error);
console.log(this.shoppingResults.map(innerList => innerList.slice(0, 3)));
return { "error": "loser" };
}
},
},
});
})();
