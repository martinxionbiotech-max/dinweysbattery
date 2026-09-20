/**
 * 公开标价 —— 单一来源（single source of truth）。
 *
 * schema 的 Offer.price / offer.priceSpecification.price 与两个 layout 的
 * 规格表里显示的「Indicative unit price」行同源于此常量，保证结构化数据与可见内容一致。
 * （GSC 商品摘要要求 price 或 priceSpecification.price；商家信息同样要求 offers 带价。）
 */
export const PUBLIC_LIST_PRICE = {
  amount: 80,
  currency: 'USD',
  display: 'US$80',
  note: 'per unit — final pricing confirmed on quotation (quantity, market and OEM terms apply)',
} as const;
