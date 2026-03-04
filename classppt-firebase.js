import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-storage.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
        apiKey: "AIzaSyC-yuLzNuwAI9WjtaTczyIU371Ircbw31M",
        authDomain: "iw01-bokss-260303.firebaseapp.com",
        projectId: "iw01-bokss-260303",
        storageBucket: "iw01-bokss-260303.firebasestorage.app",
        messagingSenderId: "778796723219",
        appId: "1:778796723219:web:577576c889cdf8f252a3e6",
        measurementId: "G-60Q26SB1LJ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const db = getFirestore(app);

window.fbApp = app;
window.fbDb = db;
window.fbStorage = storage;
window.fbServerTimestamp = serverTimestamp;
window.fbAddDoc = addDoc;
window.fbCollection = collection;
window.fbRef = ref;
window.fbListAll = listAll;
window.fbGetDownloadURL = getDownloadURL;
window.fbUploadBytes = uploadBytes;

function setupLessonSubmit(formId, btnId, textareaIds, labelSelectors) {
        const submitBtn = document.getElementById(btnId);
        if (!submitBtn) return;

        submitBtn.addEventListener('click', async function () {
                const originalText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.textContent = submitBtn.getAttribute('data-loading-text') || "上傳中...";

                const currentUserId = localStorage.getItem('currentUserId');
                if (!currentUserId) {
                        alert('請先登入！');
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                        return;
                }

                let hasSubmission = false;
                let errorOccurred = false;

                for (const id of textareaIds) {
                        const textarea = document.getElementById(id);
                        if (textarea && textarea.value.trim()) {
                                hasSubmission = true;
                                const section = id.replace('richTextInput', '');
                                const result = await uploadText(textarea.value, section, currentUserId, 'ws1');
                                if (!result) errorOccurred = true;
                        }
                }

                if (!hasSubmission) {
                        alert('請先輸入內容再提交！');
                } else if (errorOccurred) {
                        alert('有部分內容提交失敗，請檢查網絡或稍後再試。');
                } else {
                        textareaIds.forEach(id => {
                                const t = document.getElementById(id);
                                if (t) t.value = '';
                        });
                        document.querySelectorAll(labelSelectors).forEach(label => {
                                label.textContent = `成功提交`;
                        });
                }

                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
        });
}

setupLessonSubmit('dataForm_ws1', 'submitTextBtn1', ['richTextInput2-1', 'richTextInput2-2'], '#storyTabContent1 .form-label');
setupLessonSubmit('dataForm_ws2_lesson2', 'submitTextBtn2', ['richTextInput3-1', 'richTextInput3-2'], '#storyTabContent2 .form-label');
setupLessonSubmit('dataForm_ws2_lesson3', 'submitTextBtn3', ['richTextInput4-1', 'richTextInput4-2'], '#storyTabContent3 .form-label');
setupLessonSubmit('dataForm_ws2_lesson4', 'submitTextBtn4', ['richTextInput5-1', 'richTextInput5-2'], '#storyTabContent4 .form-label');

export async function uploadText(text, section, userId, workshop) {
        if (!window.fbDb || !window.fbAddDoc || !window.fbCollection) {
                console.error('Firebase 未初始化');
                return false;
        }
        if (!text || !userId || !section || !workshop) {
                console.error('缺少必要參數');
                return false;
        }

        const submissionData = {
                content: text.trim(),
                userId: userId,
                timestamp: window.fbServerTimestamp ? window.fbServerTimestamp() : new Date(),
                section: section,
                workshop: workshop
        };

        try {
                const docRef = await window.fbAddDoc(
                        window.fbCollection(window.fbDb, 'submissions'),
                        submissionData
                );
                return docRef.id;
        } catch (error) {
                console.error('Firebase upload error:', error);
                return false;
        }
}

// Expose uploadText for inline handlers (if any)
window.uploadText = uploadText;

async function uploadImage(files, imageName, userId, imagePreview, uploadButton) {
        if (!userId) {
                alert('請先登入才能上傳圖片。');
                return;
        }
        if (!files.length || !imageName) {
                alert('請選擇圖片並輸入名稱');
                return;
        }

        try {
                uploadButton.disabled = true;
                uploadButton.textContent = '上傳中...';

                for (let i = 0; i < files.length; i++) {
                        const file = files[i];
                        const fileName = `${userId}_ws1_${imageName}_${i}`;
                        const storageRef = window.fbRef(window.fbStorage, `stories/${fileName}`);
                        await window.fbUploadBytes(storageRef, file);
                        const downloadURL = await window.fbGetDownloadURL(storageRef);
                        console.log('File uploaded:', downloadURL);
                }

                alert('圖片上傳成功！');
                if (imagePreview) imagePreview.innerHTML = '';
        } catch (error) {
                console.error('Upload error:', error);
                alert('上傳失敗，請重試');
        } finally {
                uploadButton.disabled = false;
                uploadButton.textContent = '上傳圖片';
                if (files && files[0] && files[0].ownerDocument) {
                        const doc = files[0].ownerDocument;
                        const baseId = uploadButton.id.replace('uploadButton', '');
                        const imageUploadInput = doc.getElementById(`imageUpload${baseId}`);
                        const imageNameInput = doc.getElementById(`imageName${baseId}`);
                        if (imageUploadInput) imageUploadInput.value = '';
                        if (imageNameInput) imageNameInput.value = '';
                }
        }
}

const uploadBtn1 = document.getElementById('uploadButton1');
const uploadBtn2 = document.getElementById('uploadButton2');
const uploadBtn3 = document.getElementById('uploadButton3');
const uploadBtn4 = document.getElementById('uploadButton4');

const imageInput1 = document.getElementById('imageUpload1');
const imageInput2 = document.getElementById('imageUpload2');
const imageInput3 = document.getElementById('imageUpload3');
const imageInput4 = document.getElementById('imageUpload4');

const imageNameInput1 = document.getElementById('imageName1');
const imageNameInput2 = document.getElementById('imageName2');
const imageNameInput3 = document.getElementById('imageName3');
const imageNameInput4 = document.getElementById('imageName4');

const imagePreview1 = document.getElementById('imagePreview1') || document.getElementById('imagePreview');
const imagePreview2 = document.getElementById('imagePreview2') || document.getElementById('imagePreview');
const imagePreview3 = document.getElementById('imagePreview3') || document.getElementById('imagePreview');
const imagePreview4 = document.getElementById('imagePreview4') || document.getElementById('imagePreview');

if (uploadBtn1 && imageInput1 && imageNameInput1) {
        uploadBtn1.addEventListener('click', async function () {
                const userId = localStorage.getItem('currentUserId');
                if (!userId) { alert('請先登入才能上傳圖片。'); return; }
                await uploadImage(imageInput1.files, imageNameInput1.value, userId, imagePreview1, uploadBtn1);
        });
}

if (uploadBtn2 && imageInput2 && imageNameInput2) {
        uploadBtn2.addEventListener('click', async function () {
                const userId = localStorage.getItem('currentUserId');
                if (!userId) { alert('請先登入才能上傳圖片。'); return; }
                await uploadImage(imageInput2.files, imageNameInput2.value, userId, imagePreview2, uploadBtn2);
        });
}

if (uploadBtn3 && imageInput3 && imageNameInput3) {
        uploadBtn3.addEventListener('click', async function () {
                const userId = localStorage.getItem('currentUserId');
                if (!userId) { alert('請先登入才能上傳圖片。'); return; }
                await uploadImage(imageInput3.files, imageNameInput3.value, userId, imagePreview3, uploadBtn3);
        });
}

if (uploadBtn4 && imageInput4 && imageNameInput4) {
        uploadBtn4.addEventListener('click', async function () {
                const userId = localStorage.getItem('currentUserId');
                if (!userId) { alert('請先登入才能上傳圖片。'); return; }
                await uploadImage(imageInput4.files, imageNameInput4.value, userId, imagePreview4, uploadBtn4);
        });
}

