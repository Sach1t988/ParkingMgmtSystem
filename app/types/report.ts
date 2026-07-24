export interface Attendant {
  _id: string
  name: string
  phoneNumber: string
}

export interface ReportItem {
  _id: string
  ticketNumber: string
  vehicleNumber: string
  vehicleType: string
  checkInTime: string
  checkOutTime?: string
  totalHours: number
  totalAmountPaid: number
  status: string
  attendant: Attendant
}

export interface ReportMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ReportResponse {
  success: boolean
  data: {
    items: ReportItem[]
    meta: ReportMeta
  }
}