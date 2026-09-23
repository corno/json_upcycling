import * as p_ from 'pareto-core/schema'

// types

namespace Properties_ {
    
    export namespace D {
        
        export type optional = boolean
        
        export type value = Value_
    }
    
    export type D = {
        readonly 'optional': D.optional
        readonly 'value': D.value
    }
}

type Properties_ = p_.Dictionary<
    Properties_.D
>

namespace Value_ {
    
    export namespace array {
        
        export type list = Value_
        
        export namespace group {
            
            export namespace properties {
                
                export namespace D {
                    
                    export type value = Value_
                }
                
                export type D = {
                    readonly 'value': D.value
                }
            }
            
            export type properties = p_.Dictionary<
                properties.D
            >
        }
        
        export type group = {
            readonly 'properties': group.properties
        }
        
        export namespace cycle_up {
            
            export type unique_strings = null
            
            export namespace indexed_objects {
                
                export type indexing_property = string
                
                export type properties = Properties_
            }
            
            export type indexed_objects = {
                readonly 'indexing property': indexed_objects.indexing_property
                readonly 'properties': indexed_objects.properties
            }
        }
        
        export type cycle_up = 
            | readonly ['unique strings', cycle_up.unique_strings]
            | readonly ['indexed objects', cycle_up.indexed_objects]
    }
    
    export type array = 
        | readonly ['list', array.list]
        | readonly ['group', array.group]
        | readonly ['cycle up', array.cycle_up]
    
    export type boolean_ = null
    
    export type component = string
    
    export namespace number_ {
        
        export namespace integer {
            
            export namespace minimum {
                
                export type O = number
            }
            
            export type minimum = p_.Optional_Value<
                minimum.O
            >
        }
        
        export type integer = {
            readonly 'minimum': integer.minimum
        }
    }
    
    export type number_ = 
        | readonly ['integer', number_.integer]
    
    export type null_ = null
    
    export type nullable = Value_
    
    export namespace object_ {
        
        export type dictionary = Value_
        
        export namespace group {
            
            export type properties = Properties_
        }
        
        export type group = {
            readonly 'properties': group.properties
        }
        
        export namespace cycle_up {
            
            export namespace discriminated {
                
                export type discriminating_property = string
                
                export namespace options {
                    
                    export type D = Value_
                }
                
                export type options = p_.Dictionary<
                    options.D
                >
            }
            
            export type discriminated = {
                readonly 'discriminating property': discriminated.discriminating_property
                readonly 'options': discriminated.options
            }
            
            export namespace discriminated_with_fallback {
                
                export type discriminating_property = string
                
                export namespace options {
                    
                    export type D = Value_
                }
                
                export type options = p_.Dictionary<
                    options.D
                >
                
                export type fallback = Value_
            }
            
            export type discriminated_with_fallback = {
                readonly 'discriminating property': discriminated_with_fallback.discriminating_property
                readonly 'options': discriminated_with_fallback.options
                readonly 'fallback': discriminated_with_fallback.fallback
            }
            
            export namespace group_and_dictionary_mixed {
                
                export type properties = Properties_
                
                export type additional_properties = Value_
            }
            
            export type group_and_dictionary_mixed = {
                readonly 'properties': group_and_dictionary_mixed.properties
                readonly 'additional properties': group_and_dictionary_mixed.additional_properties
            }
        }
        
        export type cycle_up = 
            | readonly ['discriminated', cycle_up.discriminated]
            | readonly ['discriminated with fallback', cycle_up.discriminated_with_fallback]
            | readonly ['group and dictionary mixed', cycle_up.group_and_dictionary_mixed]
    }
    
    export type object_ = 
        | readonly ['dictionary', object_.dictionary]
        | readonly ['group', object_.group]
        | readonly ['cycle up', object_.cycle_up]
    
    export namespace string_ {
        
        export type text = null
        
        export namespace cycle_up {
            
            export namespace enumeration {
                
                export type D = null
            }
            
            export type enumeration = p_.Dictionary<
                enumeration.D
            >
        }
        
        export type cycle_up = 
            | readonly ['enumeration', cycle_up.enumeration]
    }
    
    export type string_ = 
        | readonly ['text', string_.text]
        | readonly ['cycle up', string_.cycle_up]
}

type Value_ = 
    | readonly ['array', Value_.array]
    | readonly ['boolean', Value_.boolean_]
    | readonly ['component', Value_.component]
    | readonly ['number', Value_.number_]
    | readonly ['null', Value_.null_]
    | readonly ['nullable', Value_.nullable]
    | readonly ['object', Value_.object_]
    | readonly ['string', Value_.string_]

namespace Root_ {
    
    export namespace types {
        
        export type D = Value_
    }
    
    export type types = p_.Dictionary<
        types.D
    >
    
    export type root_type = string
}

type Root_ = {
    readonly 'types': Root_.types
    readonly 'root type': Root_.root_type
}

// exported root types
export { 
    type Properties_ as Properties, 
    type Value_ as Value, 
    type Root_ as Root, 
}
