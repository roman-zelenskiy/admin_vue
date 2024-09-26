<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import { useCustomersStore } from "@/stores/customers.ts";
import { useCategoriesStore } from "@/stores/categories.ts";

import vueSelect from "@/components/plugins/VueSelect.vue";
import Pagination from "@/components/ui/Pagination.vue";
import ModalConfirmation from "@/components/ui/ModalConfirmation.vue";
// import { db, usersCollection } from "../../../firebase.config";

// import { getDocs, setDoc, deleteDoc, doc } from "firebase/firestore";

const customersStore = useCustomersStore();
const categoriesStore = useCategoriesStore();

const page = ref(1);
const searchValue = ref("");
const currentFilter = ref<CustomersFilters>("");
const totalPages = ref(0);
const customers = ref<Customer[]>([]);
const currentCategoryId = ref<string>("");
const isModalDelete = ref(false);
const { categories } = categoriesStore.getAllCategories();

const getCategoryById = (id: string) => {
  return categories.value.find((el) => el.id === id);
};

const filters: { value: CustomersFilters; title: string }[] = [
  {
    value: "id",
    title: "Id",
  },
  {
    value: "name",
    title: "Name",
  },
  {
    value: "company",
    title: "Company",
  },
  {
    value: "createdAt",
    title: "Created at",
  },
];

const currentFilterId = ref("");

const categoriesOptions = computed(() =>
  categories.value?.map((el) => {
    return {
      id: el.id,
      title: el.title,
    };
  })
);

const changeCurrentId = (value: string) => {
  currentCategoryId.value = value;
};
const switchModalDelete = (value: boolean, id: string) => {
  if (value) {
    changeCurrentId(id);
  }
  isModalDelete.value = value;
};

const changeFilter = (filterKey: CustomersFilters) => {
  currentFilter.value = filterKey;
};

const getDocuments = async () => {
  const { documents, totalPages: total } =
    await customersStore.getCustomersByFilters(page.value, {
      filterValue: searchValue.value,
      filterKey: currentFilter.value,
    });
  customers.value = documents || [];
  totalPages.value = total;
};

const onInputFilterCategory = () => {
  currentFilter.value = "categoryId";
  searchValue.value =
    categories.value?.find((el) => el.id === currentFilterId.value)?.id || "";
  getDocuments();
};

const deleteCategory = async (documentId: Customer["id"]) => {
  await customersStore.deleteDocument(documentId);
  await getDocuments();
  switchModalDelete(false, "");
};

watch(
  [page, searchValue],
  () => {
    getDocuments();
  },
  { deep: true }
);

getDocuments();

// const collectionRef = usersCollection;
// // Шаг 1: Поиск документов с одинаковым name
// const findDuplicates = async () => {
//   const snapshot = await getDocs(collectionRef);
//   const docMap = new Map();

//   snapshot.forEach((doc) => {
//     const data = doc.data();
//     const name = data.name; // Поле, по которому проверяем одинаковость

//     if (docMap.has(name)) {
//       docMap.get(name).push({ id: doc.id, data });
//     } else {
//       docMap.set(name, [{ id: doc.id, data }]);
//     }
//   });

//   return docMap;
// };

// // Шаг 2: Объединение данных и обновление одного документа
// const mergeDocuments = async () => {
//   const duplicatesMap = await findDuplicates();

//   for (const [name, docs] of duplicatesMap) {
//     console.log(`Обрабатываем дубликаты для имени "${name}":`, docs); // Логирование дубликатов

//     if (docs.length > 1) {
//       // Объединяем данные документов
//       const mergedData = { ...docs[0].data }; // Начинаем с первого документа
//       for (let i = 1; i < docs.length; i++) {
//         const currentData = docs[i].data;

//         // Объединение массивов (если есть массивы)
//         if (
//           Array.isArray(mergedData.items) &&
//           Array.isArray(currentData.items)
//         ) {
//           mergedData.items = [
//             ...new Set([...mergedData.items, ...currentData.items]),
//           ];
//         }

//         // Суммирование значений (если есть поле amount)
//         if (mergedData.amount && currentData.amount) {
//           mergedData.amount += currentData.amount;
//         }
//       }

//       // Обновляем один документ и удаляем остальные
//       const mainDocId = docs[0].id;
//       await setDoc(doc(db, "customers", mainDocId), mergedData);

//       // Удаляем остальные документы
//       for (let i = 1; i < docs.length; i++) {
//         console.log(`Удаляем документ с ID ${docs[i].id}`); // Логирование удаления
//         await deleteDoc(doc(db, "customers", docs[i].id));
//       }

//       console.log(`Документы для name "${name}" объединены.`);
//     }
//   }
// };
// mergeDocuments()
</script>

<template>
  <div class="d-flex align-items-center mb-3">
    <ModalConfirmation
      @actionSuccess="deleteCategory(currentCategoryId)"
      v-model="isModalDelete"
      :title="'Delete a customer?'"
    ></ModalConfirmation>
    <!-- <button @">load more</button> -->
    <div>
      <ul class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">PAGES</a></li>
        <li class="breadcrumb-item active text-uppercase">Customers</li>
      </ul>
      <h1 class="page-header mb-0">Customers</h1>
      <!-- {{ totalPages }} -->
    </div>

    <div class="ms-auto">
      <RouterLink to="/customer-create" href="#" class="btn btn-theme"
        ><i class="fa fa-plus-circle fa-fw me-1"></i> Create
        Customer</RouterLink
      >
    </div>
  </div>

  <card>
    <div class="tab-content p-4">
      <div class="tab-pane fade show active" id="allTab">
        <!-- BEGIN input-group -->
        <div class="input-group mb-4">
          <button
            class="btn btn-default dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {{
              filters.find((el) => currentFilter == el.value)?.title ||
              "Filter customers"
            }}
            &nbsp;
          </button>
          <div class="dropdown-menu">
            <button
              class="dropdown-item"
              @click="changeFilter(filter.value)"
              v-for="filter in filters"
              :key="filter.value"
            >
              {{ filter.title }}
            </button>
          </div>
          <div class="flex-fill position-relative">
            <div class="input-group">
              <div
                class="input-group-text position-absolute top-0 bottom-0 bg-none border-0"
                style="z-index: 1020"
              >
                <i class="fa fa-search opacity-5"></i>
              </div>
              <input
                v-model="searchValue"
                type="text"
                class="form-control ps-35px"
                placeholder="Search products"
              />
            </div>
          </div>
        </div>
        <vue-select
          class="mb-4"
          :style="'max-width: 300px'"
          v-model="currentFilterId"
          :options="categoriesOptions"
          :label="'title'"
          @option:selected="onInputFilterCategory"
          :reduce="(option: Customer) => option.id"
          placeholder="Select an option"
        >
        </vue-select>
        <!-- END input-group -->

        <!-- BEGIN table -->
        <div class="table-responsive">
          <table class="table table-hover text-nowrap">
            <thead>
              <tr>
                <th class="pt-0 pb-2"></th>
                <th class="pt-0 pb-2">Id</th>
                <th class="pt-0 pb-2">Name</th>
                <th class="pt-0 pb-2">Category</th>
                <th class="pt-0 pb-2">REF</th>
                <th class="pt-0 pb-2">Company</th>
                <th class="pt-0 pb-2">Country</th>
                <th class="pt-0 pb-2">Created At</th>
                <th class="pt-0 pb-2"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="customer in customers" :key="customer.id">
                <td>
                  <div class="d-flex align-items-center">
                    <div
                      class="w-60px h-60px bg-gray-100 d-flex align-items-center justify-content-center"
                    >
                      <RouterLink
                        class="d-flex align-items-center justify-content-center"
                        :to="/customer-update/ + customer?.id"
                      >
                        <img
                          v-if="customer?.photo"
                          alt=""
                          class="mw-100 mh-100"
                          :src="customer?.photo"
                        />

                        <svg
                          v-else
                          class="icon"
                          viewBox="0 0 65 65"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M32.5 0.0644531C36.8098 0.0644531 40.943 1.76861 43.9905 4.80203C47.038 7.83546 48.75 11.9497 48.75 16.2396C48.75 20.5295 47.038 24.6437 43.9905 27.6771C40.943 30.7105 36.8098 32.4147 32.5 32.4147C28.1902 32.4147 24.057 30.7105 21.0095 27.6771C17.962 24.6437 16.25 20.5295 16.25 16.2396C16.25 11.9497 17.962 7.83546 21.0095 4.80203C24.057 1.76861 28.1902 0.0644531 32.5 0.0644531ZM32.5 8.15201C30.3451 8.15201 28.2785 9.00409 26.7548 10.5208C25.231 12.0375 24.375 14.0946 24.375 16.2396C24.375 18.3845 25.231 20.4416 26.7548 21.9583C28.2785 23.475 30.3451 24.3271 32.5 24.3271C34.6549 24.3271 36.7215 23.475 38.2452 21.9583C39.769 20.4416 40.625 18.3845 40.625 16.2396C40.625 14.0946 39.769 12.0375 38.2452 10.5208C36.7215 9.00409 34.6549 8.15201 32.5 8.15201ZM32.5 36.4585C43.3469 36.4585 65 41.8367 65 52.6336V64.7649H0V52.6336C0 41.8367 21.6531 36.4585 32.5 36.4585ZM32.5 44.1416C20.4344 44.1416 7.71875 50.0456 7.71875 52.6336V57.0817H57.2812V52.6336C57.2812 50.0456 44.5656 44.1416 32.5 44.1416Z"
                          />
                        </svg>
                      </RouterLink>
                    </div>
                  </div>
                </td>
                <td class="align-middle">{{ customer?.id }}</td>
                <td class="align-middle">
                  <div class="ms-3 text-truncate" style="max-width: 300px">
                    <span v-if="!customer?.websiteSocial[0]"
                      >{{ customer?.name }} {{ customer?.surname }}</span
                    >
                    <a
                      v-else
                      target="_blank"
                      :href="
                        customer?.websiteSocial[0]?.value.startsWith('http')
                          ? customer?.websiteSocial[0]?.value
                          : `https://${customer?.websiteSocial[0]?.value}`
                      "
                      >{{ customer?.name }} {{ customer?.surname }}</a
                    >
                  </div>
                </td>
                <td class="align-middle">
                  {{
                    customer.categoryId
                      ? getCategoryById(customer.categoryId)?.title || "null"
                      : "null"
                  }}
                </td>
                <td class="align-middle">{{ customer?.ref || "null" }}</td>
                <td class="align-middle">{{ customer?.company || "null" }}</td>
                <td class="align-middle">{{ customer?.country || "null" }}</td>
                <td class="align-middle">
                  {{ customer?.createdAt }}
                </td>
                <td class="align-middle">
                  <button
                    @click="switchModalDelete(true, customer.id)"
                    class="btn btn-light"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- END table -->

        <Pagination
          class="justify-content-center mt-2"
          v-model:currentPage="page"
          :quantityPages="totalPages"
        ></Pagination>
      </div>
    </div>
  </card>
</template>

<style>
.icon {
  width: 50%;
  height: 40%;
  fill: var(--bs-theme);
}
</style>
