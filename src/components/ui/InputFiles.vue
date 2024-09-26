<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from "vue";



const props = defineProps({
  modelValue: {
    type: Array as () => (string | FileData)[] | null,
    required: true,
  },
  showPreview: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const files = ref<(string | FileData)[]>([]);
const imagePreviewStatus = ref<{ [key: number]: boolean }>({});

const isImageUrl = async (url: string) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    const contentType = response.headers.get("Content-Type");
    return response.ok && contentType && contentType.startsWith("image/");
  } catch (error) {
    return false;
  }
};

const checkInitialFiles = async () => {
  await Promise.all(
    files.value.map(async (file, index) => {
      if (typeof file === "string") {
        imagePreviewStatus.value[index] = await isImageUrl(file);
      } else {
        imagePreviewStatus.value[index] = file.isImage;
      }
    })
  );
};

// Слушаем изменения modelValue
watch(
  () => props.modelValue,
  async (newValue) => {
    files.value = [...newValue];
    await checkInitialFiles(); // Проверяем файлы сразу после их установки
  },
  { immediate: true }
);

const isFileData = (item: any): item is FileData => typeof item !== "string";

const handleFilesAdded = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const fileList = target.files;

  if (fileList) {
    Array.from(fileList).forEach((file) => {
      const isImage = file.type.startsWith("image/");
      const url = URL.createObjectURL(file);

      files.value.push({
        name: file.name,
        file: file,
        url: url,
        isImage: isImage,
      });
    });
    emit("update:modelValue", files.value);
    checkInitialFiles();
  }

  target.value = "";
};

const removeFile = (index: number) => {
  files.value.splice(index, 1);
  emit("update:modelValue", files.value);
};
</script>

<template>
  <div>
    <card class="mb-4">
      <card-header
        class="d-flex align-items-center bg-inverse bg-opacity-10 fw-400"
      >
        {{ title }}
      </card-header>
      <card-body class="pb-2">
        <div class="mb-2">
          <div class="d-block d-lg-flex align-items-center">
            <label class="btn btn-theme fileinput-button me-2 mb-1">
              <i class="fa fa-fw fa-plus"></i>
              <span>Add files...</span>
              <input type="file" multiple @change="handleFilesAdded" hidden />
            </label>
          </div>
        </div>

        <div class="files-grid">
          <div v-for="(file, index) in files" :key="index" class="file-card">
            <a
              :href="isFileData(file) ? file.url : file"
              target="_blank"
              class="file-link"
            ></a>
            <div v-if="isFileData(file)">
              <div v-if="file.isImage && showPreview">
                <img
                  :src="file.url"
                  alt="Image preview"
                  class="file-thumbnail"
                />
              </div>
              <div v-else class="file-icon">
                <i class="fas fa-file"></i>
              </div>
            </div>

            <div v-else>
              <div v-if="showPreview">
                <img :src="file" alt="Image preview" class="file-thumbnail" />
              </div>
              <div v-else class="file-icon">
                <i class="fas fa-file"></i>
              </div>
            </div>

            <button
            type="submit"
              @click="removeFile(index)"
              class="btn btn-remove btn-sm btn-danger"
            >
              Remove
            </button>
          </div>
        </div>
      </card-body>
    </card>
  </div>
</template>

<style scoped>
.files-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 10px;
}

.file-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  position: relative;
}

.file-thumbnail {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 10px;
}

.file-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  background-color: #eee;
  border-radius: 4px;
  margin-bottom: 10px;
}

.file-icon i {
  font-size: 40px;
}

.file-link {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
}

.btn-remove {
  position: relative;
  z-index: 101;
}

.file-link:hover {
  text-decoration: underline;
}

.btn-danger {
  margin-top: 10px;
  font-size: 12px;
}
</style>
