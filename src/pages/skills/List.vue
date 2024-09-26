<script lang="ts" setup>
import { ref, watch } from "vue";
import { useSkillsStore } from "@/stores/skills";

import Pagination from "@/components/ui/Pagination.vue";
import ModalConfirmation from "@/components/ui/ModalConfirmation.vue";

const skillsStore = useSkillsStore();

const page = ref(1);
const searchValue = ref("");
const currentFilter = ref<CategoryFilters>("");
const totalPages = ref(0);
const documents = ref<Skills[]>([]);
const currentCategoryId = ref<string>("");
const isModalDelete = ref(false);

const filters: { value: CategoryFilters; title: string }[] = [
  {
    value: "id",
    title: "Id",
  },
  {
    value: "title",
    title: "Title",
  },
  {
    value: "createdAt",
    title: "Created at",
  },
];

const changeCurrentId = (value: string) => {
  currentCategoryId.value = value;
};

const switchModalDelete = (value: boolean, id: string) => {
  if (value) {
    changeCurrentId(id);
  }
  isModalDelete.value = value;
};

const changeFilter = (filterKey: CategoryFilters) => {
  currentFilter.value = filterKey;
};

const getCategories = async () => {
  const { documents: list, totalPages: total } =
    await skillsStore.getDocsByFilters(page.value, {
      filterValue: searchValue.value,
      filterKey: currentFilter.value,
    });
  documents.value = list || [];
  totalPages.value = total;
};

const deleteCategory = async (categoryId: Skills["id"]) => {
  await skillsStore.deleteDocument(categoryId);
  await getCategories();
  switchModalDelete(false, "");
};

watch(
  [page, searchValue],
  () => {
    getCategories();
  },
  { deep: true }
);

getCategories();
</script>

<template>
  <div class="d-flex align-items-center mb-3">
    <ModalConfirmation
      @actionSuccess="deleteCategory(currentCategoryId)"
      v-model="isModalDelete"
      :title="'Delete a category?'"
    ></ModalConfirmation>
    <!-- <button @">load more</button> -->
    <div>
      <ul class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">PAGES</a></li>
        <li class="breadcrumb-item active text-uppercase">Skills</li>
      </ul>
      <h1 class="page-header mb-0">Skills</h1>
      <!-- {{ totalPages }} -->
    </div>

    <div class="ms-auto">
      <RouterLink to="/skills-create" href="#" class="btn btn-theme"
        ><i class="fa fa-plus-circle fa-fw me-1"></i> Add Skills</RouterLink
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
              "Filter categories"
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
        <!-- END input-group -->

        <!-- BEGIN table -->
        <div class="table-responsive">
          <table class="table table-hover text-nowrap">
            <thead>
              <tr>
                <th class="pt-0 pb-2">Id</th>
                <th class="pt-0 pb-2">Title</th>
                <th class="pt-0 pb-2">Created At</th>
                <th class="pt-0 pb-2">Updated At</th>
                <th class="pt-0 pb-2"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="category in documents" :key="category.id">
                <td class="align-middle">{{ category.id }}</td>
                <td>
                  <div class="d-flex align-items-center">
                    <div>
                      <RouterLink :to="/skills-update/ + category.id">{{
                        category.title
                      }}</RouterLink>
                    </div>
                  </div>
                </td>
                <td class="align-middle">{{ category?.createdAt }}</td>
                <td class="align-middle">{{ category?.updatedAt }}</td>
                <td class="align-middle">
                  <button
                    @click="switchModalDelete(true, category.id)"
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
