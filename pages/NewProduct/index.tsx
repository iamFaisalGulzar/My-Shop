import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useMutation, gql, useLazyQuery } from "@apollo/client";
import { AuthRoute } from "../components/AuthRoute";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Spinner from "../components/loader";
import { useSelector } from "react-redux";

const NewProductContainer = styled.form`
  ${tw`
        width[600px]
        height[400px]
        padding[10px]
        rounded
        background-color[rgb(124, 242, 236)]
        // background[linear-gradient(155deg, rgba(2,0,36,0.4598214285714286) 0%, rgba(110,195,170,0.3701855742296919) 34%, rgba(0,212,255,1) 100%)]
        display[flex]
        flex-wrap
        justify-center
        items-center
        margin[150px auto]
    `}
`;

const ProductInput = styled.span`
  ${tw`
        width[50%]
        display[flex]
        // background-color[antiquewhite]
        flex-col
        pl-8
    `}
  input,select {
    ${tw`
            background-color[antiquewhite]
            width[90%]
            rounded
            padding[3px 5px]
            outline-none
        `}
  }
`;

const ActionContainer = styled.div`
  ${tw`
        display[flex]
        justify-center
        width[100%]
    `}
  button {
    ${tw`
          w-36
          pt-2
          pb-2
          rounded
          background-color[cornsilk]
          hover:background-color[darkgray]
          hover:text-white
      `}
  }
`;

const GET_MINIO_URL = gql`
  query minioUrl($fileName: String!, $oldFileName: String) {
    getMinioUrl(fileName: $fileName, oldFileName: $oldFileName)
  }
`;

const UPDATE_PRODUCT = gql`
  mutation updateproduct(
    $productId: String!
    $title: String
    $description: String
    $price: Int
    $imageUrl: String
    $category: String
    $quantity: Int
  ) {
    updateProduct(
      productId: $productId
      updatedData: {
        title: $title
        description: $description
        price: $price
        imageUrl: $imageUrl
        category: $category
        quantity: $quantity
      }
    ) {
      title
      description
      price
      imageUrl
      quantity
    }
  }
`;

const CREATE_PRODUCT = gql`
  mutation createProduct(
    $title: String!
    $description: String!
    $price: Int!
    $imageUrl: String!
    $quantity: Int!
    $category: String!
  ) {
    createProduct(
      productInputData: {
        title: $title
        description: $description
        price: $price
        imageUrl: $imageUrl
        quantity: $quantity
        category: $category
      }
    ) {
      _id
      title
      description
      price
      imageUrl
      quantity
      userId
      category
    }
  }
`;

const GET_PRODUCT = gql`
  query getProductById($productId: String!) {
    getProductById(productId: $productId) {
      title
      description
      price
      imageUrl
      category
      quantity
    }
  }
`;

const GET_CATEGORIES = gql`
  query getCategories {
    getCategories {
      _id
      name
    }
  }
`;

const UpdateErrorContainer = styled.div`
  ${tw`
        width[100%]
        text-align[center]
        color[rgba(255,0,0,0.8)]
        font-size[15px]
        display[flex]
        items-center
        justify-center
  `}
  div {
    ${tw`
        width[50%]
    `}
  }
`;

const NewProductPage = styled.div`
  ${tw`
        width[100vw]
        height[90vh]
        display[flex]
        flex-col
        items-center
        justify-center
  `}
`;

const GetProductDataLoading = styled.div`
  ${tw`
        width[100vw]
        height[90vh]
        display[flex]
        items-center
        justify-center
  `}
`;

const Overlay = styled.div`
  ${tw`
        width[100vw]
        height[100vh]
        position[relative]
        
  `};
`;

const LoadingContainer = styled.span`
  ${tw`
        position[absolute]
        width[100%]
        height[100%]
        color[white]
        display[flex]
        justify-center
        items-center
        background[black]
        opacity[0.6]
        font-size[30px]
        z-index[10]
  `}
`;

const NewProduct = () => {
  const router = useRouter();
  const prodId = router.query.productId as string;
  const isUpdate = router.query.update === "true";
  const cart = useSelector((state: any) => state.cart.cart) as any;

  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredExtension, setEnteredExtension] = useState("");
  const [enteredQuantity, setEnteredQuanity] = useState("");
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [selectedFile, setSelectedFile] = useState({});
  const [enteredFileName, setEnteredFileName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState("");

  const [getCategories, { data: categories }] = useLazyQuery(GET_CATEGORIES);

  const [getProductById, { data: currentProduct, loading: getProductLoading }] =
    useLazyQuery<any>(GET_PRODUCT, {
      variables: { productId: isUpdate ? prodId : "" },
      fetchPolicy: "network-only",
    });

  const [getMinioUrl] = useLazyQuery(GET_MINIO_URL);

  const [updateProduct] = useMutation(UPDATE_PRODUCT, {
    variables: {
      productId: prodId,
      title: enteredTitle,
      description: enteredDescription,
      price: +enteredPrice,
      imageUrl: enteredFileName,
      category: selectedCategory,
      quantity: +enteredQuantity,
    },
  });

  useEffect(() => {
    getCategories();
    if (isUpdate) {
      getProductById();
      setIsUpdateData(true);
    } else {
      setEnteredTitle("");
      setEnteredDescription("");
      setEnteredPrice("");
      setEnteredExtension("");
      setEnteredQuanity("");
    }
  }, [isUpdate]);

  //to populate data into input fileds if update product
  if (isUpdateData && currentProduct) {
    const product = currentProduct.getProductById;
    setEnteredTitle(product.title);
    setEnteredDescription(product.description);
    setEnteredPrice(product.price);
    setEnteredFileName(product.imageUrl);
    setSelectedCategory(product.category);
    setEnteredQuanity(product.quantity);
    setIsUpdateData(false);
  }

  //   let params = new URLSearchParams(router);
  //   const update: boolean = router.query.update;

  const [createProduct, { loading }] = useMutation(CREATE_PRODUCT, {
    variables: {
      title: enteredTitle,
      description: enteredDescription,
      price: +enteredPrice,
      imageUrl: enteredFileName,
      quantity: +enteredQuantity,
      category: selectedCategory,
    },
  });

  async function uploadFile(file: any, url: string) {
    if (url) {
      await fetch(url, {
        method: "PUT",
        body: file,
      });
    }
  }

  const addProductSubmitHandler = async (e: any) => {
    e.preventDefault();
    if ("name" in selectedFile) {
      const url = await getMinioUrl({
        variables: {
          fileName: enteredExtension,
          oldFileName: isUpdate
            ? currentProduct?.getProductById.imageUrl
            : null,
        },
      }).catch((err) => {
        setError(err.message);
        return;
      });
      // if (!url) {
      //   await setIsError(true);
      //   return;
      // }
      setEnteredFileName(url?.data.getMinioUrl);
      await uploadFile(selectedFile, url?.data.getMinioUrl);
    }
    const success = isUpdate
      ? await updateProduct()
          .then(() => true)
          .catch(async (err) => {
            setError(err.message);
            setTimeout(() => {
              setError("");
            }, 3000);
            // await setIsError(true);
            return false;
          })
      : await createProduct()
          .then(() => true)
          .catch(async (err) => {
            console.log("ERROR : ", err.message);
            setError(err.message);
            setTimeout(() => {
              setError("");
            }, 3000);
            // await setIsError(true);
            return false;
          });
    if (!success) return;
    setEnteredTitle("");
    setEnteredDescription("");
    setEnteredExtension("");
    setEnteredPrice("");
    setEnteredQuanity("");
    router.push("/");
  };

  //   if (getProductLoading) {
  //     return (
  //       <>
  //         <Navbar />
  //         <GetProductDataLoading>
  //           <UpdateErrorContainer>Loading....</UpdateErrorContainer>
  //         </GetProductDataLoading>
  //       </>
  //     );
  //   }

  const selectImageHandler = (e: any) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setEnteredExtension(e.target.files[0].name);
  };

  return (
    <Overlay>
      {(loading || getProductLoading) && (
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      )}
      <Navbar />
      <NewProductPage>
        <NewProductContainer onSubmit={addProductSubmitHandler}>
          {error.length > 0 && (
            <UpdateErrorContainer>
              <div>{error}</div>
            </UpdateErrorContainer>
          )}
          <ProductInput>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={enteredTitle}
              onChange={(e) => setEnteredTitle(e.target.value)}
              placeholder="Enter title..."
            />
          </ProductInput>
          <ProductInput>
            <label htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              value={enteredDescription}
              onChange={(e) => setEnteredDescription(e.target.value)}
              placeholder="Enter description..."
            />
          </ProductInput>{" "}
          <ProductInput>
            <label htmlFor="price">Price</label>
            <input
              id="price"
              onChange={(e) => setEnteredPrice(e.target.value)}
              type="number"
              value={enteredPrice}
              placeholder="Enter price..."
            />
          </ProductInput>{" "}
          <ProductInput>
            <label htmlFor="imageUrl">Image Url</label>
            <input
              id="imageUrl"
              type="file"
              // value={isUpdate ? enteredImageName : imageUrl}
              onChange={selectImageHandler}
            />
          </ProductInput>
          <ProductInput>
            <label htmlFor="quantity">In stock</label>
            <input
              id="quantity"
              onChange={(e) => setEnteredQuanity(e.target.value)}
              type="number"
              value={enteredQuantity}
              placeholder="Enter quantity..."
            />
          </ProductInput>
          <ProductInput>
            <label htmlFor="quantity">Select Category</label>
            <select
              id="standard-select"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option defaultChecked>-- select an option --</option>
              {categories?.getCategories.map((category: any) => (
                <option key={category._id} value={`${category.name}`}>
                  {category.name}
                </option>
              ))}
            </select>
          </ProductInput>
          <ActionContainer>
            <button type="submit">
              {!isUpdate ? "Add Product" : "Update Product"}
            </button>

            {/* {loading && <div>Loading...</div>} */}
          </ActionContainer>
        </NewProductContainer>
      </NewProductPage>
    </Overlay>
  );
};

export default AuthRoute(NewProduct);
