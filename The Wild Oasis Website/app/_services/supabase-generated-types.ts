export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          cabinId: number
          cabinPrice: number
          createdAt: string
          endDate: string
          extrasPrice: number
          guestId: number
          hasBreakfast: boolean
          id: number
          isPaid: boolean
          nights: number
          numberOfGuests: number
          observations: string
          startDate: string
          status: string
          totalPrice: number
        }
        Insert: {
          cabinId: number
          cabinPrice: number
          createdAt?: string
          endDate: string
          extrasPrice: number
          guestId: number
          hasBreakfast: boolean
          id?: number
          isPaid: boolean
          nights: number
          numberOfGuests: number
          observations: string
          startDate: string
          status: string
          totalPrice: number
        }
        Update: {
          cabinId?: number
          cabinPrice?: number
          createdAt?: string
          endDate?: string
          extrasPrice?: number
          guestId?: number
          hasBreakfast?: boolean
          id?: number
          isPaid?: boolean
          nights?: number
          numberOfGuests?: number
          observations?: string
          startDate?: string
          status?: string
          totalPrice?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_bookings_cabinId_fkey"
            columns: ["cabinId"]
            isOneToOne: false
            referencedRelation: "cabins"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_bookings_guestId_fkey"
            columns: ["guestId"]
            isOneToOne: false
            referencedRelation: "guests"
            referencedColumns: ["id"]
          },
        ]
      }
      cabins: {
        Row: {
          createdAt: string
          description: string
          discount: number
          id: number
          imageUrl: string
          maxCapacity: number
          name: string
          regularPrice: number
        }
        Insert: {
          createdAt?: string
          description: string
          discount: number
          id?: number
          imageUrl: string
          maxCapacity: number
          name: string
          regularPrice: number
        }
        Update: {
          createdAt?: string
          description?: string
          discount?: number
          id?: number
          imageUrl?: string
          maxCapacity?: number
          name?: string
          regularPrice?: number
        }
        Relationships: []
      }
      guests: {
        Row: {
          countryFlag: string
          createdAt: string
          email: string
          fullName: string
          id: number
          nationalId: string
          nationality: string
        }
        Insert: {
          countryFlag: string
          createdAt?: string
          email: string
          fullName: string
          id?: number
          nationalId: string
          nationality: string
        }
        Update: {
          countryFlag?: string
          createdAt?: string
          email?: string
          fullName?: string
          id?: number
          nationalId?: string
          nationality?: string
        }
        Relationships: []
      }
      settings: {
        Row: {
          breakfastPrice: number
          createdAt: string
          id: number
          maximumBookingLength: number
          maximumGuestsPerBooking: number
          minimumBookingLength: number
        }
        Insert: {
          breakfastPrice: number
          createdAt?: string
          id?: number
          maximumBookingLength: number
          maximumGuestsPerBooking: number
          minimumBookingLength: number
        }
        Update: {
          breakfastPrice?: number
          createdAt?: string
          id?: number
          maximumBookingLength?: number
          maximumGuestsPerBooking?: number
          minimumBookingLength?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
