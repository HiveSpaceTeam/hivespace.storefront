<template>
    <div class="product-detail-page">
        <div class="container">
            <div class="image-gallery">
                <!-- Main Image -->
                <div class="main-image">
                    <div class="image-frame">
                        <div class="image-container">
                            <div class="image-wrapper">
                                <picture>
                                    <!-- <source type="image/webp"
                                        :srcset="`${currentImage}.webp 1x, ${currentImage}.webp 2x`"> -->
                                    <img :src="currentImage?.fileId" width="368" height="368" loading="eager">
                                </picture>
                            </div>
                        </div>
                    </div>

                    <!-- Thumbnail List -->
                    <div class="thumbnail-list">
                        <div class="thumbnail-slider">
                            <button class="nav-btn prev disabled">
                                <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M12.0899 14.5899C11.7645 14.9153 11.2368 14.9153 10.9114 14.5899L5.91139 9.58991C5.58596 9.26447 5.58596 8.73683 5.91139 8.4114L10.9114 3.41139C11.2368 3.08596 11.7645 3.08596 12.0899 3.41139C12.4153 3.73683 12.4153 4.26447 12.0899 4.58991L7.67916 9.00065L12.0899 13.4114C12.4153 13.7368 12.4153 14.2645 12.0899 14.5899Z"
                                        fill="#0A68FF"></path>
                                </svg>
                            </button>
                            <div class="thumbnails">
                                <div class="thumbnail-track">
                                    <a v-for="(image, index) in displayedProductImages" :key="index"
                                        :class="{ active: index === activeImageIndex }" @click="setActiveImage(index)">
                                        <picture>
                                            <source type="image/webp" :srcset="`${image}.webp 1x, ${image}.webp 2x`">
                                            <img width="47" height="47" :alt="`product-img-${index}`"
                                                :src="image.fileId" :srcset="`${image} 1x, ${image} 2x`">
                                        </picture>
                                    </a>
                                </div>
                            </div>
                            <button class="nav-btn next">
                                <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M5.91107 3.41107C6.23651 3.08563 6.76414 3.08563 7.08958 3.41107L12.0896 8.41107C12.415 8.73651 12.415 9.26415 12.0896 9.58958L7.08958 14.5896C6.76414 14.915 6.23651 14.915 5.91107 14.5896C5.58563 14.2641 5.58563 13.7365 5.91107 13.4111L10.3218 9.00033L5.91107 4.58958C5.58563 4.26414 5.58563 3.73651 5.91107 3.41107Z"
                                        fill="#0A68FF"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Product Info Section -->
                <!-- <div class="product-info">
                    <div class="info-item">
                        <img src="https://salt.tikicdn.com/ts/ta/d3/d4/1c/1d4ee6bf8bc9c5795529ac50a6b439dd.png"
                            alt="icon-left" width="24" height="24">
                        <div class="text">
                            <span>Xem thêm</span> Ưu điểm & lưu ý của sản phẩm
                        </div>
                    </div>
                    <img src="https://salt.tikicdn.com/ts/ta/5c/76/e2/25aa7773e0480b23252d8f1c95a03d05.png"
                        alt="icon-right" width="24" height="24">
                </div> -->
            </div>

            <!-- Main Content -->
            <div class="main-content">
                <!-- Image Gallery Section -->


                <!-- Product Details -->
                <div class="product-details">
                    <div class="product-header">
                        <!-- Product Header -->
                        <div class="header-content">
                            <div class="badges">
                                <picture>
                                    <source type="image/webp"
                                        srcset="https://salt.tikicdn.com/ts/upload/be/67/48/04a82ab8df178e1a13bde38316081865.png">
                                    <img srcset="https://salt.tikicdn.com/ts/upload/be/67/48/04a82ab8df178e1a13bde38316081865.png"
                                        width="91" height="20" alt="freeship_xtra">
                                </picture>
                                <picture>
                                    <source type="image/webp"
                                        srcset="https://salt.tikicdn.com/ts/ta/b1/3f/4e/cc3d0a2dd751a7b06dd97d868d6afa56.png">
                                    <img srcset="https://salt.tikicdn.com/ts/ta/b1/3f/4e/cc3d0a2dd751a7b06dd97d868d6afa56.png"
                                        width="114" height="20" alt="return_policy">
                                </picture>
                                <span class="brand">Thương hiệu: <a href="#">{{ 'fsd' }}</a></span>
                            </div>
                            <h1 class="product-title">{{ productDetail.name }}</h1>
                            <div class="rating">
                                <!-- Rating stars would go here -->
                            </div>
                        </div>

                        <!-- Price Section -->
                        <div class="price-section">
                            <div class="price">{{ formatPrice(getCurrentPrice()) }}</div>
                        </div>
                    </div>

                    <!-- Variants Section -->
                    <div v-if="productDetail.variants.length > 0" class="variants">
                        <!-- Color Selection -->
                        <div class="variant-group">
                            <p class="variant-label">{{ productDetail.variants[0]?.name }}</p>
                            <div class="variant-options">
                                <div v-for="(option, index) in productDetail.variants[0]?.options" :key="index"
                                    :class="{ active: selectedOptions.option1 === option.optionId }"
                                    @click="selectOption1(option)">
                                    <div class="color-option">
                                        <picture>
                                            <!-- <source type="image/webp"
                                                :srcset="`${option.image}.webp 1x, ${option.image}.webp 2x`"> -->
                                            <img alt="thumbnail" :src="getOptionImage(option)" width="42" height="42">
                                        </picture>
                                        <span>{{ option.value }}</span>
                                    </div>
                                    <img v-if="selectedOptions.option1 === option.optionId" class="selected-indicator"
                                        src="https://salt.tikicdn.com/ts/upload/6d/62/b9/ac9f3bebb724a308d710c0a605fe057d.png"
                                        alt="Selected" width="13" height="13">
                                </div>
                            </div>
                        </div>

                        <!-- Size Selection -->
                        <div class="variant-group">
                            <p class="variant-label">{{ productDetail.variants[1]?.name }}</p>
                            <div class="variant-options">
                                <div v-for="(option, index) in productDetail.variants[1]?.options" :key="index"
                                    :class="{ active: selectedOptions.option2 === option.optionId }"
                                    @click="selectSize(option)">
                                    <span>{{ option.value }}</span>
                                    <img v-if="selectedOptions.option2 === option.optionId" class="selected-indicator"
                                        src="https://salt.tikicdn.com/ts/upload/6d/62/b9/ac9f3bebb724a308d710c0a605fe057d.png"
                                        alt="Selected" width="13" height="13">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Shipping Info -->
                <div class="section">
                    <h3>Thông tin vận chuyển</h3>
                    <div class="shipping-address">
                        <span>Giao đến Q. Hoàn Kiếm, P. Hàng Trống, Hà Nội</span>
                        <span class="change-link">Đổi</span>
                    </div>
                    <div class="shipping-details">
                        <div class="shipping-item">
                            <div class="shipping-header">
                                <img src="https://salt.tikicdn.com/ts/upload/14/11/46/13b71dceb805fb57ce37d57585bc3762.png"
                                    alt="" height="16" width="32">
                                <span class="highlight">Giao Thứ Sáu</span>
                            </div>
                            <div class="shipping-fee">
                                <span>Ngày 20/03: <span class="free">Miễn phí</span><del>38.000₫</del></span>
                            </div>
                        </div>
                    </div>
                    <div class="freeship-info">
                        <picture>
                            <source type="image/webp"
                                srcset="https://salt.tikicdn.com/ts/upload/f7/85/80/51da5722c3cfa1d6d93644188d07c51a.png">
                            <img srcset="https://salt.tikicdn.com/ts/upload/f7/85/80/51da5722c3cfa1d6d93644188d07c51a.png"
                                width="79" height="16" alt="freeship-icon">
                        </picture>
                        <span>Freeship 15k đơn từ 45k, Freeship 30k đơn từ 100k</span>
                        <button class="info-btn">
                            <img src="https://salt.tikicdn.com/ts/ta/c1/c0/8f/1c42c78c42d4355130fa4a4ef9036892.png"
                                alt="info-icon" width="16" height="16">
                        </button>
                    </div>
                </div>

                <!-- Discounts -->
                <div class="section">
                    <h3>Ưu đãi khác</h3>
                    <div class="discounts">
                        <div class="discount-header">
                            <span>3 Mã Giảm Giá</span>
                            <div class="discount-codes">
                                <span class="code">Giảm 20%</span>
                                <span class="code">Giảm 8K</span>
                            </div>
                        </div>
                        <img src="https://salt.tikicdn.com/ts/upload/16/42/c1/23a144e53aadf0357f6cd2c98b525902.png"
                            width="24" height="24" alt="right-icon">
                    </div>
                </div>

                <!-- Additional Services -->
                <div class="section">
                    <h3>Dịch vụ bổ sung</h3>
                    <div class="service-item">
                        <picture>
                            <source type="image/webp"
                                srcset="https://salt.tikicdn.com/ts/upload/73/4d/f7/f86e767bffc14aa3d6abed348630100b.png">
                            <img srcset="https://salt.tikicdn.com/ts/upload/73/4d/f7/f86e767bffc14aa3d6abed348630100b.png"
                                alt="compensation-icon" height="40" width="40">
                        </picture>
                        <div class="service-content">
                            <div>Ưu đãi đến 600k với thẻ TikiCard</div>
                            <div class="link">Đăng ký</div>
                        </div>
                    </div>
                    <div class="service-item">
                        <picture>
                            <source type="image/webp"
                                srcset="https://salt.tikicdn.com/ts/upload/2a/27/6a/7bbba1f6c93a1a42a3c314e7b5825f4c.png">
                            <img srcset="https://salt.tikicdn.com/ts/upload/2a/27/6a/7bbba1f6c93a1a42a3c314e7b5825f4c.png"
                                alt="compensation-icon" height="40" width="40">
                        </picture>
                        <div class="service-content">
                            <div>Mua trước trả sau</div>
                            <div class="link">Đăng ký</div>
                        </div>
                    </div>
                </div>

                <!-- Similar Products -->
                <div class="section">
                    <h3>Sản phẩm tương tự</h3>
                    <div class="similar-products">
                        <button class="nav-btn prev disabled">
                            <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M12.0899 14.5899C11.7645 14.9153 11.2368 14.9153 10.9114 14.5899L5.91139 9.58991C5.58596 9.26447 5.58596 8.73683 5.91139 8.4114L10.9114 3.41139C11.2368 3.08596 11.7645 3.08596 12.0899 3.41139C12.4153 3.73683 12.4153 4.26447 12.0899 4.58991L7.67916 9.00065L12.0899 13.4114C12.4153 13.7368 12.4153 14.2645 12.0899 14.5899Z"
                                    fill="#0A68FF"></path>
                            </svg>
                        </button>
                        <div class="products-grid">
                            <div class="products-container">
                                <div class="product-grid">
                                    <div v-for="(similarProduct, index) in similarProducts" :key="index"
                                        class="product-card">
                                        <a href="#" @click.prevent>
                                            <div class="product-image">
                                                <picture>

                                                    <img :src="similarProduct.imageURL" :alt="similarProduct.name">
                                                </picture>
                                            </div>
                                            <div class="product-info">
                                                <h4>{{ similarProduct.name }}</h4>
                                                <div class="price">{{ (similarProduct.price) }}</div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div class="pagination">
                                    <div class="dot active"></div>
                                    <div class="dot"></div>
                                    <div class="dot"></div>
                                    <div class="dot"></div>
                                    <div class="dot"></div>
                                </div>
                            </div>
                        </div>
                        <button class="nav-btn next">
                            <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M5.91107 3.41107C6.23651 3.08563 6.76414 3.08563 7.08958 3.41107L12.0896 8.41107C12.415 8.73651 12.415 9.26415 12.0896 9.58958L7.08958 14.5896C6.76414 14.915 6.23651 14.915 5.91107 14.5896C5.58563 14.2641 5.58563 13.7365 5.91107 13.4111L10.3218 9.00033L5.91107 4.58958C5.58563 4.26414 5.58563 3.73651 5.91107 3.41107Z"
                                    fill="#0A68FF"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <!-- Warranty -->
                <div class="section">
                    <h3>Thông tin bảo hành</h3>
                    <div class="warranty-info">
                        <span>Hướng dẫn bảo hành:</span>
                        <span class="link">Xem chi tiết</span>
                    </div>
                </div>

                <!-- Benefits -->
                <div class="section">
                    <h3 class="benefits-title">An tâm mua sắm</h3>
                    <div class="benefits-list">
                        <div class="benefit-item">
                            <img alt="compensation-icon"
                                src="https://salt.tikicdn.com/ts/upload/c5/37/ee/76c708d43e377343e82baee8a0340297.png"
                                height="20" width="20">
                            <span>Được đồng kiểm khi nhận hàng</span>
                        </div>
                        <div class="benefit-item">
                            <img alt="compensation-icon"
                                src="https://salt.tikicdn.com/ts/upload/ea/02/b4/b024e431ec433e6c85d4734aaf35bd65.png"
                                height="20" width="20">
                            <span><strong>Được hoàn tiền 200%</strong> nếu là hàng giả.</span>
                        </div>
                        <div class="benefit-item">
                            <img alt="compensation-icon"
                                src="https://salt.tikicdn.com/ts/upload/d8/c7/a5/1cd5bd2f27f9bd74b2c340b8e27c4d82.png"
                                height="20" width="20">
                            <span>Đổi trả miễn phí trong 30 ngày. Được đổi ý.</span>
                            <span class="link">Chi tiết</span>
                        </div>
                    </div>
                </div>

                <!-- Product Details Info -->
               <div class="section">
                    <h3>Thông tin chi tiết</h3>
                    <div class="product-specs">
                        <div class="spec-row" v-for="(item, index) in productDetail.attributes" :key="index">
                            <span class="spec-label">{{ item.attributeName }}</span>
                            <span class="spec-value">{{ item.nameValue.join(',') }}</span>
                        </div>
                       
                    </div>
                </div> 
                <!-- Product Description -->
                <div class="section">
                    <h3>Mô tả sản phẩm</h3>
                    <div class="description " :class="{ 'collapsed': !descriptionExpanded }"
                        v-html="productDetail.description"></div>
                    <button class="toggle-btn" @click="toggleDescription">
                        {{ descriptionExpanded ? 'Rút gọn' : "Xem thêm" }}</button>
                </div>
            </div>

            <!-- Sidebar -->
            <div class="sidebar">
                <!-- Store Info -->
                <div class="store-info">
                    <div class="store-header">
                        <a href="#" @click.prevent>
                            <picture>
                                <source type="image/webp" :srcset="`${store.logo}.webp 1x, ${store.logo}.webp 2x`">
                                <img :srcset="`${store.logo} 1x, ${store.logo} 2x`" class="store-logo" width="40"
                                    height="40" :alt="store.name">
                            </picture>
                        </a>
                        <div class="store-details">
                            <a href="#" @click.prevent class="store-name">{{ store.name }}</a>
                            <div class="store-rating">
                                <span>{{ store.rating }}</span>
                                <img alt="star-icon"
                                    src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png"
                                    width="16" height="16">
                                <span>({{ store.reviewCount }} đánh giá)</span>
                            </div>
                        </div>
                        <button class="chat-btn">
                            <img alt="chat-icon"
                                src="https://salt.tikicdn.com/ts/upload/8b/82/74/cf2c041938ace329ab11fbc38da3275b.png"
                                height="20" width="20">
                        </button>
                    </div>

                    <!-- Selected Variant Info -->
                    <div class="selected-variant">
                        <picture>
                            <source type="image/webp" :srcset="`${currentImage}.webp`">
                            <img class="variant-image" :src="currentImage?.fileId" width="40" height="40" alt="variant">
                        </picture>
                        <span>{{ getSelectedOption1Value() }}, {{ getSelectedOption2Value() }}</span>
                    </div>

                    <!-- Quantity and Price -->
                    <div class="quantity-price">
                        <div class="quantity-selector">
                            <label>Số Lượng</label>
                            <div class="quantity-controls">
                                <button @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
                                <input type="text" v-model="quantity" readonly>
                                <button @click="increaseQuantity">+</button>
                            </div>
                        </div>
                        <div class="total-price">
                            <span>Tạm tính</span>
                            <span>{{ formatPrice(getCurrentPrice() * quantity) }}</span>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="action-buttons">
                        <button class="buy-now">Mua ngay</button>
                        <button class="add-cart" @click="addToCart">Thêm vào giỏ</button>
                        <button class="installment">Mua trước trả sau</button>
                    </div>
                </div>






            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { productService } from '@/services/product.service'
import { useRoute } from 'vue-router'
import type { PagedResponse, Product, ProductSummary } from '@/types'

// Reactive data
const activeImageIndex = ref(0)
const selectedOptions = ref<Record<string, any>>({
    option1: null,
    option2: null
})
const quantity = ref(1)
const descriptionExpanded = ref(false)
const route = useRoute()

const store = ref({
    name: 'TD2000 store',
    logo: 'https://vcdn.tikicdn.com/cache/w100/ts/seller/4b/54/1a/f385a79a716cb3505f152e7af8c769aa.png',
    rating: '4.0',
    reviewCount: 165
})

const similarProducts = ref<ProductSummary[]>([])
// Computed properties
const currentImage = computed(() => {
    return displayedProductImages.value[activeImageIndex.value]
})

// Methods
const setActiveImage = (index: number) => {
    activeImageIndex.value = index
}

const selectOption1 = (color: any) => {
    selectedOptions.value.option1 = color.optionId
}

const selectSize = (size: any) => {
    selectedOptions.value.option2 = size.optionId
}
const getSelectedOption1Value = () => {
    const variant = productDetail.value.variants[0]
    const option = variant?.options.find((opt: any) => opt.optionId === selectedOptions.value.option1)
    return option ? option.value : ''
}
const getSelectedOption2Value = () => {
    const variant = productDetail.value.variants[1]
    const option = variant?.options.find((opt: any) => opt.optionId === selectedOptions.value.option2)
    return option ? option.value : ''
}
const getCurrentPrice = () => {
    const sku = productDetail.value.skus.find(sku => sku.skuVariants.some(variant => variant.optionId === selectedOptions.value.option1)
        && sku.skuVariants.some(variant => variant.optionId === selectedOptions.value.option2)
    )
    if(sku){
        return sku.price.amount
    }
    return productDetail.value.skus[0]?.price.amount 
}
const increaseQuantity = () => {
    quantity.value++
}

const decreaseQuantity = () => {
    if (quantity.value > 1) {
        quantity.value--
    }
}

const addToCart = () => {

}

const toggleDescription = () => {
    descriptionExpanded.value = !descriptionExpanded.value
}

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫'
}

const productDetail = ref<Product>({
    id: '',
    name: '',
    category: '',
    description: '',
    variants: [],
    skus: [],
})

const displayedProductImages = computed(() => {
    const skuImages = productDetail.value.skus.find(sku => sku.skuVariants.some(variant => variant.optionId === selectedOptions.value.option1)
        && sku.skuVariants.some(variant => variant.optionId === selectedOptions.value.option2)

    )?.images;

    if (skuImages && skuImages.length > 0) {
        return skuImages;
    }

    return productDetail.value.skus[0]?.images || []
})
const getOptionImage = (option: any) => {
    const sku = productDetail.value.skus.find(x => x.skuVariants.some(s => s.variantId === option.productVariantId));
    if (!sku) {
        return ''
    }

    const image = sku.images?.[0];
    if (!image) {
        return ''
    }
    return image.fileId;
}
// Lifecycle
onMounted(async () => {
    const id = route.query.pid as string
    productDetail.value = await productService.getProductById(id)
    selectedOptions.value.option1 = productDetail.value.variants[0]?.options[0]?.optionId || null
    selectedOptions.value.option2 = productDetail.value.variants[1]?.options[0]?.optionId || null
    const result: PagedResponse<ProductSummary> = await productService.getProducts({
        pageIndex: 1,
        pageSize: 8,
    })

    similarProducts.value = result.data
})
</script>

<style scoped>
.product-detail-page {
    background: #f5f5f5;
    min-height: 100vh;
    padding: 16px 0;
}

.container {
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 16px;
    display: flex;
    gap: 24px;
}

.main-content {
    flex: 1;
}

.sidebar {
    width: 400px;
    flex-shrink: 0;
}

/* Image Gallery */
.image-gallery {
    background: white;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    position: sticky;
    top: 12px;
    height: 500px;
}

.main-image {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.image-frame {
    border-radius: 8px;
    overflow: hidden;
    background: white;
}

.image-container {
    width: 368px;
    height: 368px;
    position: relative;
    cursor: pointer;
}

.image-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
}

.image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 2;
    opacity: 1;
}

/* Thumbnail Slider */
.thumbnail-slider {
    display: flex;
    align-items: center;
    gap: 8px;
}

.thumbnails {
    flex: 1;
    overflow: hidden;
}

.thumbnail-track {
    display: flex;
    gap: 8px;
    transform: translateX(0);
    transition: transform 0.5s ease-in-out;
}

.thumbnail-track a {
    cursor: pointer;
    border-radius: 4px;
    overflow: hidden;
    border: 2px solid transparent;
    transition: border-color 0.2s;
}

.thumbnail-track a.active {
    border-color: #0a68ff;
}

.thumbnail-track img {
    width: 47px;
    height: 47px;
    display: block;
}

.nav-btn {
    cursor: pointer;
    color: #0a68ff;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: white;
    border: 1px solid #e0e0e0;
    transition: all 0.2s;
}

.nav-btn:hover:not(.disabled) {
    background: #f0f8ff;
    border-color: #0a68ff;
}

.nav-btn.disabled {
    color: #ccc;
    cursor: not-allowed;
    border-color: #f0f0f0;
}

/* Product Info */
.product-info {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    background: #f8f9fa;
    border-radius: 8px;
    flex-direction: column;
}

.product-info .text {
    color: #808089;
    font-size: 14px;
}

/* Product Details */
.product-details {
    background: white;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
}

.product-header {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.header-content {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.badges {
    display: flex;
    align-items: center;
    gap: 8px;
}

.badges img {
    height: 20px;
}

.brand {
    color: #808089;
    font-size: 14px;
}

.product-title {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.4;
    color: #27272a;
    margin: 8px 0;
}

.price-section {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.price {
    font-size: 24px;
    font-weight: 600;
    color: #27272a;
}

/* Variants */
.variants {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.variant-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.variant-label {
    font-size: 14px;
    font-weight: 600;
    color: #27272a;
    margin: 0;
}

.variant-options {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.variant-options>div {
    padding: 8px 16px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    cursor: pointer;
    background: white;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
}

.variant-options>div.active {
    border-color: #0a68ff;
    background: #f0f8ff;
}

.variant-options>div:hover {
    border-color: #0a68ff;
}

.color-option {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 0;
}

.color-option img {
    width: 42px;
    height: 42px;
    border-radius: 4px;
}

.selected-indicator {
    width: 13px;
    height: 13px;
    position: absolute;
    top: -4px;
    right: -4px;
}

/* Sections */
.section {
    background: white;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
}

.section h3 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
    color: #27272a;
}

/* Shipping */
.shipping-address {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
    font-size: 14px;
}

.change-link {
    color: #0a68ff;
    cursor: pointer;
}

.shipping-details {
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
}

.shipping-item {
    display: flex;
    align-items: center;
    gap: 12px;
}

.shipping-header {
    display: flex;
    align-items: center;
    gap: 8px;
}

.highlight {
    font-weight: 600;
    color: #00ab56;
}

.shipping-fee {
    margin-left: auto;
    color: #27272a;
}

.free {
    color: #00ab56;
}

.freeship-info {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 0;
}

.freeship-info img {
    height: 16px;
}

.info-btn {
    cursor: pointer;
    padding: 4px;
}

/* Discounts */
.discounts {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
}

.discount-header {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.discount-codes {
    display: flex;
    gap: 8px;
}

.code {
    background: #fff2f2;
    color: #d0011b;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
}

/* Services */
.service-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 0;
    cursor: pointer;
}

.service-item img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.05);
}

.service-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.service-content .link {
    color: #0a68ff;
    font-weight: 400;
    cursor: pointer;
}

/* Similar Products */
.similar-products {
    display: flex;
    align-items: center;
    padding-top: 12px;
}

.products-grid {
    flex: 1;
    overflow: hidden;
}

.products-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(calc(25% - 8px), 1fr));
    grid-template-rows: repeat(2, 1fr);
    grid-auto-flow: row;
    gap: 8px;
    width: 460px;
}

.product-card {
    height: 100%;
    width: 100%;
}

.product-card a {
    text-decoration: none;
    color: inherit;
    display: block;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.2s;
}

.product-card a:hover {
    transform: translateY(-2px);
}

.product-image {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
}

.product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.product-info {
    padding: 8px;
}

.product-info h4 {
    font-size: 12px;
    line-height: 1.4;
    color: #27272a;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 4px;
}

.product-info .price {
    font-weight: 600;
    color: #27272a;
    font-size: 12px;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    margin-top: 8px;
}

.dot {
    width: 16px;
    height: 2px;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
}

.dot.active {
    width: 24px;
    background: #0a68ff;
}

/* Sidebar */
.store-info {
    background: white;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    position: sticky;
    top: 0
}

.store-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f0f0f0;
}

.store-logo {
    border-radius: 50%;
    min-width: 40px;
}

.store-details {
    flex: 1;
}

.store-name {
    font-size: 16px;
    font-weight: 600;
    color: #27272a;
    text-decoration: none;
}

.store-rating {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 2px;
}

.store-rating span {
    font-size: 14px;
    font-weight: 600;
    color: #27272a;
}

.chat-btn {
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
    background: #f8f9fa;
}

.selected-variant {
    display: grid;
    grid-template-columns: 40px 1fr;
    gap: 8px;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
}

.variant-image {
    width: 40px;
    height: 40px;
    border-radius: 4px;
}

.quantity-price {
    padding: 12px 0;
}

.quantity-selector {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 12px;
}

.quantity-selector label {
    font-size: 14px;
    font-weight: 500;
    color: #27272a;
}

.quantity-controls {
    display: flex;
    align-items: center;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
}

.quantity-controls button {
    width: 32px;
    height: 32px;
    border: none;
    background: #f8f9fa;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
}

.quantity-controls button:hover:not(:disabled) {
    background: #e9ecef;
}

.quantity-controls button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

.quantity-controls input {
    width: 48px;
    height: 32px;
    border: none;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
}

.total-price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #27272a;
}

.action-buttons {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 16px;
}

.buy-now,
.add-cart,
.installment {
    border: none;
    border-radius: 4px;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}

.buy-now {
    background: #0a68ff;
    color: white;
}

.buy-now:hover {
    background: #0056cc;
}

.add-cart,
.installment {
    background: white;
    color: #0a68ff;
    border: 1px solid #0a68ff;
}

.add-cart:hover,
.installment:hover {
    background: #f0f8ff;
}

/* Description */
.description {
    overflow: hidden;
    line-height: 1.7;
    max-width: 460px;
}

.description.collapsed {
    max-height: 400px;
}

.toggle-btn {
    color: #0a68ff;
    cursor: pointer;
    font-size: 14px;
    margin-top: 8px;
    text-decoration: underline;
    border: none;
    background: none;
    padding: 0;
}

/* Reviews */
.reviews-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 32px 16px;
    text-align: center;
}

.reviews-empty span {
    color: #808089;
    font-size: 14px;
}

/* Warranty & Benefits */
.warranty-info {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 12px 0;
}

.benefits-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
}

.benefits-list {
    display: flex;
    flex-direction: column;
}

.benefit-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
}

.benefit-item img {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
}

/* Product Specs */
.product-specs {
    display: flex;
    flex-direction: column;
}

.spec-row {
    display: grid;
    grid-template-columns: 55% 45%;
    gap: 4px;
    padding: 8px 0;
    border-bottom: 1px solid #f0f0f0;
}

.spec-row:last-child {
    border-bottom: none;
}

.spec-label {
    color: #808089;
    font-size: 14px;
}

.spec-value {
    font-weight: 500;
    color: #27272a;
    text-align: right;
}

/* Links */
.link {
    color: #0a68ff;
    cursor: pointer;
    text-decoration: underline;
}

/* Responsive */
@media (max-width: 768px) {
    .container {
        flex-direction: column;
    }

    .sidebar {
        width: 100%;
    }

    .image-gallery {
        position: static;
    }

    .main-image {
        width: 100%;
    }

    .image-container {
        width: 100%;
        height: auto;
        aspect-ratio: 1 / 1;
    }

    .product-grid {
        width: 100%;
    }
}
</style>
