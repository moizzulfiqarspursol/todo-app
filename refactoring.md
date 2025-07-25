#### **Centralized Error Handling (Global Middleware)**

Use a global `ErrorHandlerMiddleware` to handle all exceptions thrown in your controllers and services. This avoids repetitive try-catch logic and ensures consistent HTTP responses across the API. You should throw well-defined exceptions like `ArgumentException`, `KeyNotFoundException`, or custom ones, and let the middleware translate them to proper HTTP status codes.

**Example:**
Instead of doing this:

```csharp
try {
    var result = await _service.Get(id);
    return Ok(result);
} catch (Exception ex) {
    return StatusCode(500, new ErrorResponse(...));
}
```

Just throw:

```csharp
if (note == null)
    throw new KeyNotFoundException("Note not found.");
```

And let this middleware catch it:

```csharp
case KeyNotFoundException:
    response.StatusCode = (int)HttpStatusCode.NotFound;
    break;
```

---

#### **Clean and Consistent Use of ActionResult<T>**

Always return `ActionResult<T>` and use helper methods like `Ok(...)`, `NotFound(...)`, and `BadRequest(...)` to indicate the intent of your response clearly. This aligns with RESTful conventions and improves code readability.

**Example:**
Instead of:

```csharp
return StatusCode(500, new ErrorResponse(...));
```

Do this:

```csharp
return NotFound(new ErrorResponse("No collaborators found for this note.", "Not Found"));
```

And for successful data returns:

```csharp
return Ok(response);
```

---

#### **Strong Request Validation via FluentValidation**

Use FluentValidation for validating input models. Place all rules in separate validator classes and apply rules declaratively — this avoids cluttering controller logic with manual validations and makes input validation reusable and testable.

**Example:**
Validator for file extension check:

```csharp
RuleForEach(x => x.Files)
    .ChildRules(file => {
        file.RuleFor(f => f.FileName)
            .Must(fileName => {
                var ext = Path.GetExtension(fileName).ToLower();
                return allowedFileExtensions.Contains(ext);
            })
            .WithMessage(f => $"{f.FileName} file not allowed.");
    });
```

Apply it in controller:

```csharp
public async Task<ActionResult<List<AddAttachmentResponse>>> AddAttachments([FromForm] AddNoteAttachmentsRequest request)
```

---

#### **Defensive Programming with Guard Clauses**

Place early validation (aka “guard clauses”) at the top of each method to check for invalid or null input before processing. This improves clarity and prevents downstream bugs from creeping in later due to bad input.

**Example:**

```csharp
if (noteId <= 0)
    throw new ArgumentException("Note ID must be greater than zero.");

if (request == null)
    throw new ArgumentException("Invalid request payload.");
```

This keeps methods flat, readable, and safe from bad inputs.

---

#### **Proper Separation of Concerns**

**Instruction:**
Keep controller methods thin — only orchestrate calls to services and return results. Push all business logic, validation, and notification flows to the appropriate services (e.g., `_noteService`, `_notificationService`). This keeps things modular, testable, and clean.

**Example:**

```csharp
var collaboratorId = await _noteCollaboratorService.AddCollaboratorAndFireNotfication(...);

await _sendNotification(...); // Thin orchestration only
```

All logic like DB access, notification firing, or state updates should stay in services.

---

#### **Predictable and Testable Endpoints**

**Instruction:**
Return structured models with consistent types (e.g., `ErrorResponse`, `NoteDetailsResponse`) and ensure endpoints are predictable — they shouldn’t return different shapes depending on internal conditions. Avoid side effects in GETs and stick to REST principles.

**Example:**
Predictable success return:

```csharp
return Ok(response);
```

Predictable failure:

```csharp
throw new KeyNotFoundException("No comments found for the specified note.");
```

This pattern makes it easy to mock, unit test, and validate.
