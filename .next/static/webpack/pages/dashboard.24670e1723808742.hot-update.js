"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/dashboard",{

/***/ "./src/components/Sections/edit.tsx":
/*!******************************************!*\
  !*** ./src/components/Sections/edit.tsx ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _TwoFac__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TwoFac */ \"./src/components/Sections/TwoFac.tsx\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/image */ \"./node_modules/next/image.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\nconst Edit = ()=>{\n    _s();\n    const [showTwoFac, setShowTwoFac] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [Preview, setPreview] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [Avatar, setAvatar] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [Username, setUsername] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [isAvatarChanged, setIsAvatarChanged] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [isUsernameChanged, setIsUsernameChanged] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        getAvatar();\n        getNick();\n    }, []);\n    // Function to handle the button click and show the <TwoFac> component\n    function handleAuthClick() {\n        setShowTwoFac(true);\n    }\n    function handleAvatarPreview(e) {\n        var _e_target_files;\n        const file = (_e_target_files = e.target.files) === null || _e_target_files === void 0 ? void 0 : _e_target_files[0];\n        if (file) {\n            const previewUrl = URL.createObjectURL(file);\n            setPreview(previewUrl);\n        }\n    }\n    function handleAvatarChange(e) {\n        var _e_target_files;\n        const file = (_e_target_files = e.target.files) === null || _e_target_files === void 0 ? void 0 : _e_target_files[0];\n        if (file) {\n            const previewUrl = URL.createObjectURL(file);\n            setPreview(previewUrl);\n            setIsAvatarChanged(true);\n            setAvatar(file); // Save the file in the state for later submission\n        } else {\n            alert(\"Upload the file you MF!\");\n        }\n    }\n    function handleNickChange(e) {\n        setUsername(e.target.value);\n        setIsUsernameChanged(true);\n    }\n    async function getAvatar() {\n        try {\n            const Token = localStorage.getItem(\"token\");\n            const headers = {\n                Authorization: \"Bearer \".concat(Token)\n            };\n            const res = await axios__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"http://localhost:9000/users/me\", {\n                headers\n            });\n            const avatar = res.data.avatarPic;\n            console.log(res.data);\n            setPreview(avatar);\n        } catch (err) {\n            console.log(err);\n        }\n    }\n    async function getNick() {\n        try {\n            const Token = localStorage.getItem(\"token\");\n            const headers = {\n                Authorization: \"Bearer \".concat(Token)\n            };\n            const res = await axios__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"http://localhost:9000/users/me\", {\n                headers\n            });\n            const nickname = res.data.nickname;\n            console.log(res.data);\n            setUsername(nickname);\n        } catch (err) {\n            console.log(err);\n        }\n    }\n    async function handleSaveChanges() {\n        try {\n            if (isAvatarChanged && Avatar) {\n                const data = new FormData();\n                data.append(\"avatarPic\", Avatar);\n                const token = localStorage.getItem(\"token\");\n                const headers = {\n                    \"Content-Type\": \"multipart/form-data\",\n                    Authorization: \"Bearer \".concat(token)\n                };\n                await axios__WEBPACK_IMPORTED_MODULE_4__[\"default\"].patch(\"http://localhost:9000/users/upload/avatar\", data, {\n                    headers\n                });\n                alert(\"Avatar updated!\");\n            }\n            if (isUsernameChanged && Username) {\n                const Token = localStorage.getItem(\"token\");\n                const headers = {\n                    Authorization: \"Bearer \".concat(Token)\n                };\n                const data = {\n                    nickname: Username\n                };\n                await axios__WEBPACK_IMPORTED_MODULE_4__[\"default\"].patch(\"http://localhost:9000/users/me/settings/change-username\", data, {\n                    headers\n                });\n                alert(\"Username changed!\");\n            }\n            if (isAvatarChanged && Avatar || isUsernameChanged && Username) {\n                window.location.reload();\n            } else {\n                alert(\"No changes to save.\");\n            }\n        } catch (err) {\n            alert(err);\n        }\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: !showTwoFac ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"my-20 h-[70%] gap-3 justify-center flex flex-col w-full mx-[2rem]  border-2 border-opacity-30 border-violet-400 bg-opacity-20 bg-white bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"border-2 flex overflow-scroll flex-col justify-between gap-10  h-[90%] border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex flex-col gap-10 bg-black/20\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"bg-black/20\",\n                                children: \"Change the Avatar:\"\n                            }, void 0, false, {\n                                fileName: \"/Users/com/Desktop/last_transcendance/src/components/Sections/edit.tsx\",\n                                lineNumber: 135,\n                                columnNumber: 11\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_3___default()), {\n                                src: Preview,\n                                alt: \"\",\n                                width: 200,\n                                height: 200\n                            }, void 0, false, {\n                                fileName: \"/Users/com/Desktop/last_transcendance/src/components/Sections/edit.tsx\",\n                                lineNumber: 136,\n                                columnNumber: 11\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                type: \"file\",\n                                accept: \".jpg, .jpeg, .png\",\n                                onChange: (e)=>{\n                                    handleAvatarChange(e);\n                                    handleAvatarPreview(e);\n                                }\n                            }, void 0, false, {\n                                fileName: \"/Users/com/Desktop/last_transcendance/src/components/Sections/edit.tsx\",\n                                lineNumber: 137,\n                                columnNumber: 11\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/com/Desktop/last_transcendance/src/components/Sections/edit.tsx\",\n                        lineNumber: 134,\n                        columnNumber: 11\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex flex-col gap-10 bg-black/20\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"flex flex-row gap-10\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"bg-black/20 flex-1 max-w-md\",\n                                    children: \"Change username:\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/com/Desktop/last_transcendance/src/components/Sections/edit.tsx\",\n                                    lineNumber: 149,\n                                    columnNumber: 11\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                    className: \"p-2 rounded-lg  text-white bg-black/60 flex-1 max-w-sm\",\n                                    value: Username,\n                                    type: \"text\",\n                                    placeholder: \"Type new username\",\n                                    onChange: handleNickChange\n                                }, void 0, false, {\n                                    fileName: \"/Users/com/Desktop/last_transcendance/src/components/Sections/edit.tsx\",\n                                    lineNumber: 150,\n                                    columnNumber: 11\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/com/Desktop/last_transcendance/src/components/Sections/edit.tsx\",\n                            lineNumber: 148,\n                            columnNumber: 11\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"/Users/com/Desktop/last_transcendance/src/components/Sections/edit.tsx\",\n                        lineNumber: 147,\n                        columnNumber: 11\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex flex-col justify-between\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"flex justify-between\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    className: \"bg-black p-3 rounded-2xl\",\n                                    onClick: handleAuthClick,\n                                    children: \" Activate auth\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/com/Desktop/last_transcendance/src/components/Sections/edit.tsx\",\n                                    lineNumber: 167,\n                                    columnNumber: 15\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    className: \"bg-black p-3 rounded-2xl\",\n                                    onClick: handleSaveChanges,\n                                    children: \"Save changes\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/com/Desktop/last_transcendance/src/components/Sections/edit.tsx\",\n                                    lineNumber: 168,\n                                    columnNumber: 15\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/com/Desktop/last_transcendance/src/components/Sections/edit.tsx\",\n                            lineNumber: 166,\n                            columnNumber: 11\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"/Users/com/Desktop/last_transcendance/src/components/Sections/edit.tsx\",\n                        lineNumber: 164,\n                        columnNumber: 11\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/com/Desktop/last_transcendance/src/components/Sections/edit.tsx\",\n                lineNumber: 133,\n                columnNumber: 9\n            }, undefined)\n        }, void 0, false, {\n            fileName: \"/Users/com/Desktop/last_transcendance/src/components/Sections/edit.tsx\",\n            lineNumber: 132,\n            columnNumber: 9\n        }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"h-screen w-full md:w-[90%] flex mx-auto \",\n            children: [\n                showTwoFac && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_TwoFac__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n                    fileName: \"/Users/com/Desktop/last_transcendance/src/components/Sections/edit.tsx\",\n                    lineNumber: 176,\n                    columnNumber: 22\n                }, undefined),\n                \" \"\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/com/Desktop/last_transcendance/src/components/Sections/edit.tsx\",\n            lineNumber: 175,\n            columnNumber: 14\n        }, undefined)\n    }, void 0, false);\n};\n_s(Edit, \"UWhzJwXRDcbOr21xBjRqMJ3bUEc=\");\n_c = Edit;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Edit);\nvar _c;\n$RefreshReg$(_c, \"Edit\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YUFBWTtvQ0FBb0JELFVBQVVqQzs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NBY2pKLDhEQUFDd0I7d0JBQUlDLFdBQVU7a0NBRWYsNEVBQUNEOzRCQUFJQyxXQUFVOzs4Q0FDWCw4REFBQ1U7b0NBQU9WLFdBQVU7b0NBQTJCVyxTQUFTL0M7OENBQWlCOzs7Ozs7OENBQ3ZFLDhEQUFDOEM7b0NBQU9WLFdBQVU7b0NBQTJCVyxTQUFTcEI7OENBQW9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7c0NBTzNFLDhEQUFDUTtZQUFJQyxXQUFVOztnQkFDckJsRCw0QkFBYyw4REFBQ0wsK0NBQU1BOzs7OztnQkFBSTs7Ozs7Ozs7QUFJaEM7R0E1S01JO0tBQUFBO0FBOEtOLCtEQUFlQSxJQUFJQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL1NlY3Rpb25zL2VkaXQudHN4PzdhMGYiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnXG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgVHdvRmFjIGZyb20gJy4vVHdvRmFjJ1xuaW1wb3J0IHsgdXNlU3RhdGUsIENoYW5nZUV2ZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSW1hZ2UgZnJvbSAnbmV4dC9pbWFnZSc7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5jb25zdCBFZGl0ID0gKCkgPT4ge1xuXG4gICAgY29uc3QgW3Nob3dUd29GYWMsIHNldFNob3dUd29GYWNdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFtQcmV2aWV3LCBzZXRQcmV2aWV3XSA9IHVzZVN0YXRlKFwiXCIpO1xuICAgIGNvbnN0IFtBdmF0YXIsIHNldEF2YXRhcl0gPSB1c2VTdGF0ZTxGaWxlIHwgbnVsbD4obnVsbCk7XG4gICAgY29uc3QgW1VzZXJuYW1lLCBzZXRVc2VybmFtZV0gPSB1c2VTdGF0ZSgnJyk7XG4gICAgY29uc3QgW2lzQXZhdGFyQ2hhbmdlZCwgc2V0SXNBdmF0YXJDaGFuZ2VkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCBbaXNVc2VybmFtZUNoYW5nZWQsIHNldElzVXNlcm5hbWVDaGFuZ2VkXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICBnZXRBdmF0YXIoKTtcbiAgICAgIGdldE5pY2soKTtcbiAgICB9LCBbXSk7XG4gICAgLy8gRnVuY3Rpb24gdG8gaGFuZGxlIHRoZSBidXR0b24gY2xpY2sgYW5kIHNob3cgdGhlIDxUd29GYWM+IGNvbXBvbmVudFxuXG5cbiAgICBmdW5jdGlvbiBoYW5kbGVBdXRoQ2xpY2soKSB7XG4gICAgICBzZXRTaG93VHdvRmFjKHRydWUpO1xuICAgIH1cblxuICAgIFxuICAgIGZ1bmN0aW9uIGhhbmRsZUF2YXRhclByZXZpZXcoZTogQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pXG4gICAge1xuICAgICAgY29uc3QgZmlsZSA9IGUudGFyZ2V0LmZpbGVzPy5bMF07XG4gICAgICBpZihmaWxlKVxuICAgICAge1xuICAgICAgICBjb25zdCBwcmV2aWV3VXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKTtcbiAgICAgICAgc2V0UHJldmlldyhwcmV2aWV3VXJsKTtcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gaGFuZGxlQXZhdGFyQ2hhbmdlKGU6IENoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSB7XG4gICAgICBjb25zdCBmaWxlID0gZS50YXJnZXQuZmlsZXM/LlswXTtcbiAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgIGNvbnN0IHByZXZpZXdVcmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpO1xuICAgICAgICBzZXRQcmV2aWV3KHByZXZpZXdVcmwpO1xuICAgICAgICBzZXRJc0F2YXRhckNoYW5nZWQodHJ1ZSk7XG4gICAgICAgIHNldEF2YXRhcihmaWxlKTsgLy8gU2F2ZSB0aGUgZmlsZSBpbiB0aGUgc3RhdGUgZm9yIGxhdGVyIHN1Ym1pc3Npb25cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFsZXJ0KCdVcGxvYWQgdGhlIGZpbGUgeW91IE1GIScpO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBoYW5kbGVOaWNrQ2hhbmdlKGU6IENoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KVxuICAgIHtcbiAgICAgIHNldFVzZXJuYW1lKGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgIHNldElzVXNlcm5hbWVDaGFuZ2VkKHRydWUpXG5cbiAgICB9XG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0QXZhdGFyKClcbiAgICB7XG4gICAgICB0cnlcbiAgICAgIHtcbiAgICAgICAgICBjb25zdCBUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xuICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSB7QXV0aG9yaXphdGlvbjogYEJlYXJlciAke1Rva2VufWB9XG4gICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXhpb3MuZ2V0KCdodHRwOi8vbG9jYWxob3N0OjkwMDAvdXNlcnMvbWUnLCB7aGVhZGVyc30pOyBcbiAgICAgICAgICBjb25zdCBhdmF0YXIgPSByZXMuZGF0YS5hdmF0YXJQaWM7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpXG4gICAgICAgICAgc2V0UHJldmlldyhhdmF0YXIpO1xuXG4gICAgICB9XG4gICAgICBjYXRjaChlcnIpXG4gICAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICBhc3luYyBmdW5jdGlvbiBnZXROaWNrKClcbiAgICB7XG4gICAgICB0cnlcbiAgICAgIHtcbiAgICAgICAgICBjb25zdCBUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xuICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSB7QXV0aG9yaXphdGlvbjogYEJlYXJlciAke1Rva2VufWB9XG4gICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXhpb3MuZ2V0KCdodHRwOi8vbG9jYWxob3N0OjkwMDAvdXNlcnMvbWUnLCB7aGVhZGVyc30pOyBcbiAgICAgICAgICBjb25zdCBuaWNrbmFtZT0gcmVzLmRhdGEubmlja25hbWU7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpXG4gICAgICAgICAgc2V0VXNlcm5hbWUobmlja25hbWUpO1xuXG4gICAgICB9XG4gICAgICBjYXRjaChlcnIpXG4gICAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gaGFuZGxlU2F2ZUNoYW5nZXMoKSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoaXNBdmF0YXJDaGFuZ2VkICYmIEF2YXRhcikge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgICBkYXRhLmFwcGVuZCgnYXZhdGFyUGljJywgQXZhdGFyKTtcbiAgICAgICAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xuICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnLFxuICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAsXG4gICAgICAgICAgfTtcbiAgICAgICAgICBhd2FpdCBheGlvcy5wYXRjaCgnaHR0cDovL2xvY2FsaG9zdDo5MDAwL3VzZXJzL3VwbG9hZC9hdmF0YXInLCBkYXRhLCB7IGhlYWRlcnMgfSk7XG4gICAgICAgICAgYWxlcnQoJ0F2YXRhciB1cGRhdGVkIScpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGlmIChpc1VzZXJuYW1lQ2hhbmdlZCAmJiBVc2VybmFtZSkge1xuICAgICAgICAgIGNvbnN0IFRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJyk7XG4gICAgICAgICAgY29uc3QgaGVhZGVycyA9IHsgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke1Rva2VufWAgfTtcbiAgICAgICAgICBjb25zdCBkYXRhID0geyBuaWNrbmFtZTogVXNlcm5hbWUgfTtcbiAgICAgICAgICBhd2FpdCBheGlvcy5wYXRjaCgnaHR0cDovL2xvY2FsaG9zdDo5MDAwL3VzZXJzL21lL3NldHRpbmdzL2NoYW5nZS11c2VybmFtZScsIGRhdGEsIHsgaGVhZGVycyB9KTtcbiAgICAgICAgICBhbGVydCgnVXNlcm5hbWUgY2hhbmdlZCEnKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBpZiAoKGlzQXZhdGFyQ2hhbmdlZCAmJiBBdmF0YXIpIHx8IChpc1VzZXJuYW1lQ2hhbmdlZCAmJiBVc2VybmFtZSkpIHtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWxlcnQoJ05vIGNoYW5nZXMgdG8gc2F2ZS4nKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgXG4gICAgICAgIGFsZXJ0KGVycik7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICBcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgIHtcbiAgICAgICFzaG93VHdvRmFjID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm15LTIwIGgtWzcwJV0gZ2FwLTMganVzdGlmeS1jZW50ZXIgZmxleCBmbGV4LWNvbCB3LWZ1bGwgbXgtWzJyZW1dICBib3JkZXItMiBib3JkZXItb3BhY2l0eS0zMCBib3JkZXItdmlvbGV0LTQwMCBiZy1vcGFjaXR5LTIwIGJnLXdoaXRlIGJnLWJsdXItbWQgYmFja2Ryb3AtZmlsdGVyIGJhY2tkcm9wLWJsdXItbWQgcC00IHJvdW5kZWQtWzMwcHhdXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9yZGVyLTIgZmxleCBvdmVyZmxvdy1zY3JvbGwgZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIGdhcC0xMCAgaC1bOTAlXSBib3JkZXItb3BhY2l0eS0zMCBib3JkZXItdmlvbGV0LTQwMCBiZy1vcGFjaXR5LTUgYmctZ3JhZGllbnQtdG8tbCBmcm9tLVtyZ2JhKDI1NSwyNTUsMjU1LDAuMjApXSBiZy1ibHVyLW1kIGJhY2tkcm9wLWZpbHRlciBiYWNrZHJvcC1ibHVyLW1kIHAtNCByb3VuZGVkLVszMHB4XVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmbGV4IGZsZXgtY29sIGdhcC0xMCBiZy1ibGFjay8yMCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ibGFjay8yMFwiPkNoYW5nZSB0aGUgQXZhdGFyOjwvZGl2PlxuICAgICAgICAgIDxJbWFnZSBzcmM9e1ByZXZpZXd9IGFsdD1cIlwiIHdpZHRoPXsyMDB9IGhlaWdodD17MjAwfS8+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgICBhY2NlcHQ9XCIuanBnLCAuanBlZywgLnBuZ1wiXG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGhhbmRsZUF2YXRhckNoYW5nZShlKTtcbiAgICAgICAgICAgICAgaGFuZGxlQXZhdGFyUHJldmlldyhlKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZmxleCBmbGV4LWNvbCBnYXAtMTAgYmctYmxhY2svMjAnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmbGV4IGZsZXgtcm93IGdhcC0xMCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2JnLWJsYWNrLzIwIGZsZXgtMSBtYXgtdy1tZCc+Q2hhbmdlIHVzZXJuYW1lOjwvZGl2PlxuICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC1sZyAgdGV4dC13aGl0ZSBiZy1ibGFjay82MCBmbGV4LTEgbWF4LXctc21cIiB2YWx1ZT17VXNlcm5hbWV9IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9J1R5cGUgbmV3IHVzZXJuYW1lJyBvbkNoYW5nZT17aGFuZGxlTmlja0NoYW5nZX0vPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHsvKiA8ZGl2IGNsYXNzTmFtZT0nZmxleCBmbGV4LXJvdyBnYXAtMTAnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdiZy1ibGFjay8yMCBmbGV4LTEgbWF4LXctbWQnPkNoYW5nZSBlbWFpbDo8L2Rpdj5cbiAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQtbGcgIHRleHQtd2hpdGUgYmctYmxhY2svNjAgZmxleC0xIG1heC13LXNtXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj0nVHlwZSBuZXcgZW1haWwnLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYmctYmxhY2svMjAnPkNoYW5nZSBwYXNzd29yZDogPC9kaXY+XG4gICAgICAgICAgPGRpdiAgY2xhc3NOYW1lPSdmbGV4IGZsZXgtcm93IGdhcC0xMCBqdXN0aWZ5LWNlbnRlcic+XG4gICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC1sZyB0ZXh0LXdoaXRlIGJnLWJsYWNrLzYwXCIgdHlwZT1cInBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9J1R5cGUgb2xkIHBhc3N3b3JkJy8+XG4gICAgICAgICAgICAgIDxpbnB1dCAgY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQtbGcgdGV4dC13aGl0ZSBiZy1ibGFjay82MFwiIHR5cGU9XCJwYXNzd29yZFwiIHBsYWNlaG9sZGVyPSdUeXBlIG5ldyBwYXNzd29yZCcvPlxuICAgICAgICAgIDwvZGl2PiAqL31cbiAgICAgICAgICA8L2Rpdj5cbiAgXG4gIFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2Vlbic+XG4gICAgICAgICBcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZmxleCBqdXN0aWZ5LWJldHdlZW4nPlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYmctYmxhY2sgcC0zIHJvdW5kZWQtMnhsJyBvbkNsaWNrPXtoYW5kbGVBdXRoQ2xpY2t9PiBBY3RpdmF0ZSBhdXRoPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdiZy1ibGFjayBwLTMgcm91bmRlZC0yeGwnIG9uQ2xpY2s9e2hhbmRsZVNhdmVDaGFuZ2VzfSA+U2F2ZSBjaGFuZ2VzPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gIFxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICkgOiAgICA8ZGl2IGNsYXNzTmFtZT1cImgtc2NyZWVuIHctZnVsbCBtZDp3LVs5MCVdIGZsZXggbXgtYXV0byBcIj5cbiAgICAgIHtzaG93VHdvRmFjICYmIDxUd29GYWMgLz59IDwvZGl2PlxuICAgIH1cbiAgPC8+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVkaXQ7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJUd29GYWMiLCJ1c2VTdGF0ZSIsIkltYWdlIiwiYXhpb3MiLCJFZGl0Iiwic2hvd1R3b0ZhYyIsInNldFNob3dUd29GYWMiLCJQcmV2aWV3Iiwic2V0UHJldmlldyIsIkF2YXRhciIsInNldEF2YXRhciIsIlVzZXJuYW1lIiwic2V0VXNlcm5hbWUiLCJpc0F2YXRhckNoYW5nZWQiLCJzZXRJc0F2YXRhckNoYW5nZWQiLCJpc1VzZXJuYW1lQ2hhbmdlZCIsInNldElzVXNlcm5hbWVDaGFuZ2VkIiwiZ2V0QXZhdGFyIiwiZ2V0TmljayIsImhhbmRsZUF1dGhDbGljayIsImhhbmRsZUF2YXRhclByZXZpZXciLCJlIiwiZmlsZSIsInRhcmdldCIsImZpbGVzIiwicHJldmlld1VybCIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsImhhbmRsZUF2YXRhckNoYW5nZSIsImFsZXJ0IiwiaGFuZGxlTmlja0NoYW5nZSIsInZhbHVlIiwiVG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJyZXMiLCJnZXQiLCJhdmF0YXIiLCJkYXRhIiwiYXZhdGFyUGljIiwiY29uc29sZSIsImxvZyIsImVyciIsIm5pY2tuYW1lIiwiaGFuZGxlU2F2ZUNoYW5nZXMiLCJGb3JtRGF0YSIsImFwcGVuZCIsInRva2VuIiwicGF0Y2giLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlbG9hZCIsImRpdiIsImNsYXNzTmFtZSIsInNyYyIsImFsdCIsIndpZHRoIiwiaGVpZ2h0IiwiaW5wdXQiLCJ0eXBlIiwiYWNjZXB0Iiwib25DaGFuZ2UiLCJwbGFjZWhvbGRlciIsImJ1dHRvbiIsIm9uQ2xpY2siXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/Sections/edit.tsx\n"));

/***/ })

});