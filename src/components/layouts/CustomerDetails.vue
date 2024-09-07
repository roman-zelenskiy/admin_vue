<script setup lang="ts">
import quillEditor from "@/components/plugins/QuillEditor.vue";
import vueSelect from "@/components/plugins/VueSelect.vue";
import InputImage from "@/components/ui/InputImage.vue";
import datepicker from "@/components/plugins/Datepicker.vue";

import { ref, computed } from "vue";
import { useCountriesStore } from "@/stores/countries.ts";
import { useAppConstantsStore } from "@/stores/app-constants.ts";

const countriesStore = useCountriesStore();
const appConstantsStore = useAppConstantsStore();

const visibilityOptions = appConstantsStore.visibilityOptions;
const countries = computed(() => countriesStore.countriesList);

const tag = ref("");
const tags = ref([
  {
    text: "Laptop",
  },
  {
    text: "Apple",
  },
]);
const tagSize = ref("");
const tagsSize = ref([
  {
    text: "XL",
  },
  {
    text: "S",
  },
]);
const tagColor = ref("");
const tagsColor = ref([
  {
    text: "Black",
  },
]);
const tagMaterial = ref("");
const tagsMaterial = ref([]);
const tagsAutocomplete = ref([
  { text: "javascript" },
  { text: "css" },
  { text: "html" },
]);
</script>

<template>
  <div class="d-flex align-items-center mb-3">
    <div>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="javascript:;">PAGES</a></li>
        <li class="breadcrumb-item active">CREATE CUSTOMER</li>
      </ol>
      <h1 class="page-header mb-0">Create Customer</h1>
    </div>
  </div>

  <div class="row gx-4">
    <div class="">
      <card class="mb-4">
        <card-header
          class="d-flex align-items-center bg-inverse bg-opacity-10 fw-400"
        >
          Customer Information
        </card-header>
        <card-body>
          <div class="row">
            <div>
              <div class="row">
                <div class="col-md-6 row-md-3 mb-3">
                  <label class="form-label"
                    >Photo <span class="text-danger"></span
                  ></label>
                  <InputImage></InputImage>
                </div>
                <div class="col-md-6 mb-3">
                  <div class="mb-3">
                    <label class="form-label"
                      >Name <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      class="form-control"
                      name="name"
                      placeholder="Customer name"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label"
                      >Surname <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      class="form-control"
                      name="surname"
                      placeholder="Customer surname"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label"
                      >REF <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      class="form-control"
                      name="surname"
                      placeholder="Customer REF"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label"
                >Type account <span class="text-danger">*</span></label
              >
              <vue-select
                :options="['Business account', 'Personal account']"
                placeholder="Select an option"
              ></vue-select>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Role </label>
              <vue-select
                :options="[
                  'Owner',
                  'Manager',
                  'Agent',
                  'Lead',
                  'Buyer',
                  'Coordinator',
                  'Integrator',
                  'Marketing',
                  'Receptionist',
                  'Team leader',
                ]"
                placeholder="Select an option"
              ></vue-select>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label"
                >Category <span class="text-danger">*</span></label
              >
              <input
                type="text"
                class="form-control"
                name="category"
                placeholder="Customer category"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Country </label>
              <vue-select
                :options="countries"
                placeholder="Select an country"
              ></vue-select>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label"
                >State <span class="text-danger">*</span></label
              >
              <input
                type="text"
                class="form-control"
                name="state"
                placeholder="Customer state"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label"
                >City <span class="text-danger">*</span></label
              >
              <input
                type="text"
                class="form-control"
                name="city"
                placeholder="Customer city"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label"
                >Address <span class="text-danger">*</span></label
              >
              <input
                type="text"
                class="form-control"
                name="address"
                placeholder="Customer address"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Language </label>
              <vue-select
                :options="countries"
                placeholder="Select an language"
              ></vue-select>
            </div>

            <div class="col-md-6 mb-3">
              <label class="form-label"
                >Partners <span class="text-danger">*</span></label
              >
              <input
                type="number"
                class="form-control"
                name="partners"
                placeholder="Customer partners"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label"
                >Listings <span class="text-danger">*</span></label
              >
              <input
                type="number"
                class="form-control"
                name="listings"
                placeholder="Customer listings"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Available slots </label>
              <input
                type="number"
                class="form-control"
                name="availableSlots"
                placeholder="Available slots"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Customers </label>
              <input
                type="number"
                class="form-control"
                name="customers"
                placeholder="Customer customers"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Leads </label>
              <input
                type="number"
                class="form-control"
                name="leads"
                placeholder="Customer leads"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Buyers </label>
              <input
                type="number"
                class="form-control"
                name="buyers"
                placeholder="Customer buyers"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Sellers </label>
              <input
                type="number"
                class="form-control"
                name="sellers"
                placeholder="Customer sellers"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Followers </label>
              <input
                type="number"
                class="form-control"
                name="followers"
                placeholder="Customer followers"
              />
            </div>

            <div class="">
              <label class="form-label"
                >About user <span class="text-danger">*</span></label
              >
              <div class="form-control p-0">
                <div class="border-0">
                  <quill-editor theme="snow" class="h-250px" />
                </div>
              </div>
            </div>
          </div>
        </card-body>
      </card>
      <div class="">
        <card class="mb-4">
          <card-header
            class="d-flex align-items-center fw-400 bg-inverse bg-opacity-15"
          >
            <div class="flex-1">
              <div>Experience</div>
            </div>
          </card-header>
          <card-body>
            <div class="row">
              <div class="col-lg-8  overflow-auto">
                <table class="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th class="pt-0 pb-2"></th>
                      <th class="pt-0 pb-2">Company</th>
                      <th class="pt-0 pb-2">Position</th>
                      <th class="pt-0 pb-2">Employment type</th>
                      <th class="pt-0 pb-2">Work period</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div class="d-flex align-items-center">
                          <div
                            class="w-60px h-60px bg-gray-100 d-flex align-items-center justify-content-center"
                          >
                            <img
                              alt=""
                              class="mw-100 mh-100"
                              src="/assets/img/product/product-6.jpg"
                            />
                          </div>
                        </div>
                      </td>
                      <td class="align-middle">83 in stock for 3 variants</td>
                      <td class="align-middle">Cotton</td>
                      <td class="align-middle">Force Majeure</td>
                      <td class="align-middle">Force Majeure</td>
                    </tr>
                    <tr>
                      <td>
                        <div class="d-flex align-items-center">
                          <div
                            class="w-60px h-60px bg-gray-100 d-flex align-items-center justify-content-center"
                          >
                            <img
                              alt=""
                              class="mw-100 mh-100"
                              src="/assets/img/product/product-7.jpg"
                            />
                          </div>
                        </div>
                      </td>
                      <td class="align-middle">79 in stock for 3 variants</td>
                      <td class="align-middle">Cotton</td>
                      <td class="align-middle">Polo</td>
                      <td class="align-middle">Force Majeure</td>
                    </tr>
                    <tr>
                      <td>
                        <div class="d-flex align-items-center">
                          <div
                            class="w-60px h-60px bg-gray-100 d-flex align-items-center justify-content-center"
                          >
                            <img
                              alt=""
                              class="mw-100 mh-100"
                              src="/assets/img/product/product-8.jpg"
                            />
                          </div>
                        </div>
                      </td>
                      <td class="align-middle">19 in stock for 1 variants</td>
                      <td class="align-middle">Sports</td>
                      <td class="align-middle">Nike</td>
                      <td class="align-middle">Force Majeure</td>
                    </tr>
                    <tr>
                      <td>
                        <div class="d-flex align-items-center">
                          <div
                            class="w-60px h-60px bg-gray-100 d-flex align-items-center justify-content-center"
                          >
                            <img
                              alt=""
                              class="mw-100 mh-100"
                              src="/assets/img/product/product-9.jpg"
                            />
                          </div>
                        </div>
                      </td>
                      <td class="align-middle">19 in stock for 1 variants</td>
                      <td class="align-middle">Sports</td>
                      <td class="align-middle">Nike</td>
                      <td class="align-middle">Force Majeure</td>
                    </tr>
                    <tr>
                      <td>
                        <div class="d-flex align-items-center">
                          <div
                            class="w-60px h-60px bg-gray-100 d-flex align-items-center justify-content-center"
                          >
                            <img
                              alt=""
                              class="mw-100 mh-100"
                              src="/assets/img/product/product-10.jpg"
                            />
                          </div>
                        </div>
                      </td>
                      <td class="align-middle">19 in stock for 1 variants</td>
                      <td class="align-middle">Sports</td>
                      <td class="align-middle">Skate</td>
                      <td class="align-middle">Force Majeure</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-lg-4">
                <div class="mb-3">
                  <label class="form-label"
                    >Logo <span class="text-danger">*</span></label
                  >
                  <InputImage></InputImage>
                </div>
                <div class="mb-3">
                  <label class="form-label"
                    >Company <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    class="form-control"
                    name="company"
                    placeholder="Company title"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label"
                    >Position <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    class="form-control"
                    name="position"
                    placeholder="Position"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Country </label>
                  <vue-select
                    :options="countries"
                    placeholder="Select an country"
                  ></vue-select>
                </div>
                <div class="mb-3">
                  <label class="form-label"
                    >City <span class="text-danger"></span
                  ></label>
                  <input
                    type="text"
                    class="form-control"
                    name="city"
                    placeholder="City"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Employment type </label>
                  <vue-select
                    :options="[
                      'Full time',
                      'Part time',
                      'Self-employed',
                      'Freelancer',
                      'Intership',
                    ]"
                    placeholder="Select an option"
                  ></vue-select>
                </div>
                <div class="mb-3">
                  <label class="form-label"
                    >Work period <span class="text-danger">*</span>
                  </label>
                  <datepicker range multiCalendars />
                </div>
                <div class="mb-3">
                  <label class="form-label"
                    >Comment <span class="text-danger">*</span></label
                  >
                  <div class="form-control p-0">
                    <div class="border-0">
                      <quill-editor theme="snow" class="h-250px" />
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-end">
                  <span class="btn btn-theme fileinput-button me-2 mb-1">
                    <i class="fa fa-fw fa-plus"></i>
                    <span>Add Experience</span>
                  </span>
                </div>
              </div>
            </div>
          </card-body>
        </card>
      </div>

      <card class="mb-4">
        <card-header
          class="d-flex align-items-center bg-inverse bg-opacity-15 fw-400"
        >
          Contacts
        </card-header>
        <card-body>
          <div>
            <div class="d-flex align-items-center justify-content-between">
              <p><strong>Phone</strong></p>
              <span class="btn btn-theme fileinput-button me-2 mb-1">
                <i class="fa fa-fw fa-plus"></i>
                <span>Add phone...</span>
              </span>
            </div>
            <div class="row mb-3 fw-bold text-body">
              <div class="col">Option type</div>
              <div class="col">Option values</div>
              <div class="col-1"></div>
            </div>
            <div class="row mb-3 gx-3">
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  name="variant[0][name]"
                  placeholder="e.g Size"
                  value="Size"
                />
              </div>
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  name="variant[0][name]"
                  placeholder="e.g Size"
                  value="Size"
                />
              </div>
              <div class="col-1">
                <a href="#" class="btn btn-default d-block"
                  ><i class="fa fa-xmark"></i
                ></a>
              </div>
            </div>
          </div>
          <div>
            <div class="d-flex align-items-center justify-content-between">
              <p><strong>Email</strong></p>
              <span class="btn btn-theme fileinput-button me-2 mb-1">
                <i class="fa fa-fw fa-plus"></i>
                <span>Add email...</span>
              </span>
            </div>
            <div class="row mb-3 fw-bold text-body">
              <div class="col">Option type</div>
              <div class="col">Option values</div>
              <div class="col-1"></div>
            </div>
            <div class="row mb-3 gx-3">
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  name="variant[0][name]"
                  placeholder="e.g Size"
                  value="Size"
                />
              </div>
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  name="variant[0][name]"
                  placeholder="e.g Size"
                  value="Size"
                />
              </div>
              <div class="col-1">
                <a href="#" class="btn btn-default d-block"
                  ><i class="fa fa-xmark"></i
                ></a>
              </div>
            </div>
          </div>
          <div>
            <div class="d-flex align-items-center justify-content-between">
              <p><strong>Website/Social</strong></p>
              <span class="btn btn-theme fileinput-button me-2 mb-1">
                <i class="fa fa-fw fa-plus"></i>
                <span>Add option...</span>
              </span>
            </div>
            <div class="row mb-3 fw-bold text-body">
              <div class="col">Option type</div>
              <div class="col">Option values</div>
              <div class="col-1"></div>
            </div>
            <div class="row mb-3 gx-3">
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  name="variant[0][name]"
                  placeholder="e.g Size"
                  value="Size"
                />
              </div>
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  name="variant[0][name]"
                  placeholder="e.g Size"
                  value="Size"
                />
              </div>
              <div class="col-1">
                <a href="#" class="btn btn-default d-block"
                  ><i class="fa fa-xmark"></i
                ></a>
              </div>
            </div>
          </div>
        </card-body>
      </card>

      <card class="mb-4">
        <card-header
          class="d-flex align-items-center bg-inverse bg-opacity-15 fw-400"
        >
          Notifications
        </card-header>
        <card-body>
          <div class="p-3 bg-inverse bg-opacity-10">
            <div class="form-group mb-0">
              <div class="shipping-container">
                <div class="row align-items-center">
                  <div class="col-6 pt-1 pb-1">Display block catalogue</div>
                  <div class="col-6 d-flex align-items-center">
                    <div class="form-check w-100 form-switch ms-auto">
                      <vue-select
                        :options="['Countries', 'Type', 'Class', 'Market']"
                        placeholder="Select an option"
                      ></vue-select>
                      <label class="form-check-label" for="">&nbsp;</label>
                    </div>
                  </div>
                </div>
                <hr class="mt-2 mb-2" />

                <div class="row align-items-center">
                  <div class="col-6 pt-1 pb-1">
                    Display comision for partners
                  </div>
                  <div class="col-6 d-flex align-items-center">
                    <div class="form-check w-100 form-switch ms-auto">
                      <vue-select
                        :options="visibilityOptions"
                        placeholder="Select an option"
                      ></vue-select>
                      <label class="form-check-label" for="">&nbsp;</label>
                    </div>
                  </div>
                </div>
                <hr class="mt-2 mb-2" />

                <div class="row align-items-center">
                  <div class="col-6 pt-1 pb-1">Display my partners for</div>
                  <div class="col-6 d-flex align-items-center">
                    <div class="form-check w-100 form-switch ms-auto">
                      <vue-select
                        :options="visibilityOptions"
                        placeholder="Select an option"
                      ></vue-select>
                      <label class="form-check-label" for="">&nbsp;</label>
                    </div>
                  </div>
                </div>
                <hr class="mt-2 mb-2" />

                <div class="row align-items-center">
                  <div class="col-6 pt-1 pb-1">
                    Activate comments in my posts for
                  </div>
                  <div class="col-6 d-flex align-items-center">
                    <div class="form-check w-100 form-switch ms-auto">
                      <vue-select
                        :options="visibilityOptions"
                        placeholder="Select an option"
                      ></vue-select>
                      <label class="form-check-label" for="">&nbsp;</label>
                    </div>
                  </div>
                </div>
                <hr class="mt-2 mb-2" />

                <div class="row align-items-center">
                  <div class="col-6 pt-1 pb-1">
                    Receive invitation to group by
                  </div>
                  <div class="col-6 d-flex align-items-center">
                    <div class="form-check w-100 form-switch ms-auto">
                      <vue-select
                        :options="visibilityOptions"
                        placeholder="Select an option"
                      ></vue-select>
                      <label class="form-check-label" for="">&nbsp;</label>
                    </div>
                  </div>
                </div>
                <hr class="mt-2 mb-2" />

                <div class="row align-items-center">
                  <div class="col-6 pt-1 pb-1">
                    Receive invitation to events by
                  </div>
                  <div class="col-6 d-flex align-items-center">
                    <div class="form-check w-100 form-switch ms-auto">
                      <vue-select
                        :options="visibilityOptions"
                        placeholder="Select an option"
                      ></vue-select>
                      <label class="form-check-label" for="">&nbsp;</label>
                    </div>
                  </div>
                </div>
                <hr class="mt-2 mb-2" />

                <div class="row align-items-center">
                  <div class="col-6 pt-1 pb-1">
                    Notification payment by status invoice
                  </div>
                  <div class="col-6 d-flex align-items-center">
                    <div class="form-check w-100 form-switch ms-auto">
                      <vue-select
                        :options="['Failed', 'Paid']"
                        placeholder="Select an option"
                      ></vue-select>
                      <label class="form-check-label" for="">&nbsp;</label>
                    </div>
                  </div>
                </div>
                <hr class="mt-2 mb-2" />

                <div class="row align-items-center">
                  <div class="col-6 pt-1 pb-1">Alert unreaded contacts</div>
                  <div class="col-6 d-flex align-items-center">
                    <div class="form-check w-100 form-switch ms-auto">
                      <input
                        type="number"
                        class="form-control"
                        name="partners"
                      />
                      <label class="form-check-label" for="">&nbsp;</label>
                    </div>
                  </div>
                </div>
                <hr class="mt-2 mb-2" />

                <div class="row align-items-center">
                  <div class="col-6 pt-1 pb-1">
                    Alert declined booking a viewing
                  </div>
                  <div class="col-6 d-flex align-items-center">
                    <div class="form-check w-100 form-switch ms-auto">
                      <input
                        type="number"
                        class="form-control"
                        name="partners"
                      />
                      <label class="form-check-label" for="">&nbsp;</label>
                    </div>
                  </div>
                </div>
                <hr class="mt-2 mb-2" />

                <div class="row align-items-center">
                  <div class="col-6 pt-1 pb-1">
                    Notification show activity on the market by type in diferent
                    cities
                  </div>
                  <div class="col-6 d-flex align-items-center">
                    <div class="form-check w-100 form-switch ms-auto">
                      <input type="text" class="form-control" name="partners" />
                      <label class="form-check-label" for="">&nbsp;</label>
                    </div>
                  </div>
                </div>
                <hr class="mt-2 mb-2" />

                <div class="row align-items-center">
                  <div class="col-6 pt-1 pb-1">
                    Notification show price analysis by type in diferent cities
                  </div>
                  <div class="col-6 d-flex align-items-center">
                    <div class="form-check w-100 form-switch ms-auto">
                      <input type="text" class="form-control" name="partners" />
                      <label class="form-check-label" for="">&nbsp;</label>
                    </div>
                  </div>
                </div>
                <hr class="mt-2 mb-2" />

                <div class="row align-items-center">
                  <div class="col-6 pt-1 pb-1">
                    Notification subscription Expire Days
                  </div>
                  <div class="col-6 d-flex align-items-center">
                    <div class="form-check w-100 form-switch ms-auto">
                      <input
                        type="number"
                        class="form-control"
                        name="partners"
                      />
                      <label class="form-check-label" for="">&nbsp;</label>
                    </div>
                  </div>
                </div>
                <hr class="mt-2 mb-2" />

                <div class="row align-items-center">
                  <div class="col-6 pt-1 pb-1">
                    Notification display profile
                  </div>
                  <div class="col-6 d-flex align-items-center">
                    <div class="form-check form-switch ms-auto">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="shippingFree"
                        name="shipping_free_enable"
                        checked
                        value="1"
                      />
                      <label class="form-check-label" for="shippingFree"
                        >&nbsp;</label
                      >
                    </div>
                  </div>
                </div>
                <hr class="mt-2 mb-2" />
                <div class="row align-items-center">
                  <div class="col-6 pt-1 pb-1">
                    Notification display real estate
                  </div>
                  <div class="col-6 d-flex align-items-center">
                    <div class="form-check form-switch ms-auto">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="shippingAliExpress"
                        name="shipping_enable"
                        value="AliExpress"
                      />
                      <label class="form-check-label" for="shippingAliExpress"
                        >&nbsp;</label
                      >
                    </div>
                  </div>
                </div>
                <hr class="mt-2 mb-2" />
                <div class="row align-items-center">
                  <div class="col-6 pt-1 pb-1">
                    Who can send me a private message
                  </div>
                  <div class="col-6 d-flex align-items-center">
                    <div class="form-check form-switch ms-auto">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="shippingSaleHoo"
                        name="shipping_enable"
                        value="SaleHoo"
                      />
                      <label class="form-check-label" for="shippingSaleHoo"
                        >&nbsp;</label
                      >
                    </div>
                  </div>
                </div>
                <hr class="mt-2 mb-2" />
                <div class="row align-items-center">
                  <div class="col-6 pt-1 pb-1">
                    Notification receive request
                  </div>
                  <div class="col-6 d-flex align-items-center">
                    <div class="form-check form-switch ms-auto">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="shippingMegagoods"
                        name="shipping_enable"
                        value="Megagoods"
                      />
                      <label class="form-check-label" for="shippingMegagoods"
                        >&nbsp;</label
                      >
                    </div>
                  </div>
                </div>
                <hr class="mt-2 mb-2" />
                <div class="row align-items-center">
                  <div class="col-6 pt-1 pb-1">
                    Notification booking a viewing
                  </div>
                  <div class="col-6 d-flex align-items-center">
                    <div class="form-check form-switch ms-auto">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="shippingWholesale2B"
                        name="shipping_enable"
                        value="Wholesale2B"
                      />
                      <label class="form-check-label" for="shippingWholesale2B"
                        >&nbsp;</label
                      >
                    </div>
                  </div>
                </div>
                <hr class="mt-2 mb-2" />
                <div class="row align-items-center">
                  <div class="col-6 pt-1 pb-1">Notification make an offer</div>
                  <div class="col-6 d-flex align-items-center">
                    <div class="form-check form-switch ms-auto">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="shippingSunriseWholesale"
                        name="shipping_enable"
                        value="Sunrise Wholesale"
                      />
                      <label
                        class="form-check-label"
                        for="shippingSunriseWholesale"
                        >&nbsp;</label
                      >
                    </div>
                  </div>
                </div>
                <hr class="mt-2 mb-2" />
                <div class="row align-items-center">
                  <div class="col-6 pt-1 pb-1">
                    Receive notification of sharing leads from other partners
                  </div>
                  <div class="col-6 d-flex align-items-center">
                    <div class="form-check form-switch ms-auto">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="shippingSunriseWholesale"
                        name="shipping_enable"
                        value="Sunrise Wholesale"
                      />
                      <label
                        class="form-check-label"
                        for="shippingSunriseWholesale"
                        >&nbsp;</label
                      >
                    </div>
                  </div>
                </div>
                <hr class="mt-2 mb-2" />
                <div class="row align-items-center">
                  <div class="col-6 pt-1 pb-1">
                    Receive notification of new added real estate by other
                    partners
                  </div>
                  <div class="col-6 d-flex align-items-center">
                    <div class="form-check form-switch ms-auto">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="shippingSunriseWholesale"
                        name="shipping_enable"
                        value="Sunrise Wholesale"
                      />
                      <label
                        class="form-check-label"
                        for="shippingSunriseWholesale"
                        >&nbsp;</label
                      >
                    </div>
                  </div>
                </div>
                <hr class="mt-2 mb-2" />

                <div class="row align-items-center">
                  <div class="col-6 pt-1 pb-1">
                    Notification Show Viewing Data
                  </div>
                  <div class="col-6 d-flex align-items-center">
                    <div class="form-check form-switch ms-auto">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="shippingSunriseWholesale"
                        name="shipping_enable"
                        value="Sunrise Wholesale"
                      />
                      <label
                        class="form-check-label"
                        for="shippingSunriseWholesale"
                        >&nbsp;</label
                      >
                    </div>
                  </div>
                </div>
                <hr class="mt-2 mb-2" />

                <div class="row align-items-center">
                  <div class="col-6 pt-1 pb-1">Verified</div>
                  <div class="col-6 d-flex align-items-center">
                    <div class="form-check form-switch ms-auto">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="shippingSunriseWholesale"
                        name="shipping_enable"
                        value="Sunrise Wholesale"
                      />
                      <label
                        class="form-check-label"
                        for="shippingSunriseWholesale"
                        >&nbsp;</label
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </card-body>
      </card>

      <card class="mb-4">
        <card-header
          class="d-flex align-items-center bg-inverse bg-opacity-10 fw-400"
        >
          Billing information
        </card-header>
        <card-body>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label"
                >Billing method <span class="text-danger">*</span></label
              >
              <vue-select
                :options="['E-Invoice', 'Paper invoice']"
                placeholder="Select an option"
              ></vue-select>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label"
                >Billion for <span class="text-danger"></span
              ></label>
              <vue-select
                :options="[
                  'Membership',
                  'Subscription',
                  'Per listing',
                  'Per lead',
                ]"
                placeholder="Select an option"
              ></vue-select>
            </div>

            <div class="col-md-6 mb-3">
              <label class="form-label"
                >Billing country <span class="text-danger">*</span></label
              >
              <vue-select
                :options="countries"
                placeholder="Select an option"
              ></vue-select>
            </div>

            <div class="col-md-6 mb-3">
              <label class="form-label"
                >Billing state <span class="text-danger">*</span></label
              >
              <input
                type="text"
                class="form-control"
                name="surname"
                placeholder="Billing state"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label"
                >Billing address

                <span class="text-danger">*</span></label
              >
              <input
                type="text"
                class="form-control"
                name="surname"
                placeholder="Billing address"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label"
                >Postal code <span class="text-danger">*</span></label
              >
              <input
                type="text"
                class="form-control"
                name="surname"
                placeholder="Postal code"
              />
            </div>

            <div class="col-md-6 mb-3">
              <label class="form-label"
                >Company <span class="text-danger">*</span></label
              >
              <input
                type="text"
                class="form-control"
                name="surname"
                placeholder="Postal code"
              />
            </div>

            <div class="col-md-6 mb-3">
              <label class="form-label"
                >Type account <span class="text-danger">*</span></label
              >
              <vue-select
                :options="['Business account', 'Personal account']"
                placeholder="Select an option"
              ></vue-select>
            </div>

            <div class="col-md-6 mb-3">
              <label class="form-label"
                >Method of payment <span class="text-danger">*</span></label
              >
              <vue-select
                :options="['Bank account', 'Card']"
                placeholder="Select an option"
              ></vue-select>
            </div>

            <div class="col-md-6 mb-3">
              <label class="form-label"
                >Cicle of payment <span class="text-danger">*</span></label
              >
              <vue-select
                :options="['At the begging', 'At the end']"
                placeholder="Select an option"
              ></vue-select>
            </div>

            <div class="col-md-6 mb-3">
              <label class="form-label"
                >Subcriptions <span class="text-danger">*</span></label
              >
              <vue-select
                :options="['Premium', 'Fremium']"
                placeholder="Select an option"
              ></vue-select>
            </div>
          </div>
        </card-body>
      </card>
    </div>
  </div>
</template>
