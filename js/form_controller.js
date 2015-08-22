/**
 * This class handles event handling for the passed in elements
 *
 * @constructor
 * @param  {object} Object containing information about the inputs. Each key must be the id of the input
 * @param  {jQuery} submit Submit button element to submit the data
 * @param  {jQuery} container The parent container of the inputs to attach the event handler to
 * @return {void}
 */
var form_controller = function(inputs, submit, container) {
  this.inputs_ = inputs;
  this.submit_ = submit;
  this.loading = false;
  container.focusout(this.focusout_handler_.bind(this));
  submit.click(this.submit_handler_.bind(this));
};

form_controller.prototype.focusout_handler_ = function(e) {
  var self = this;

  if (e.target !== e.currentTarget) {
    var input = self.inputs_[e.target.id];
    self.validate_(input);
  }

  e.stopPropagation();
};

/**
 * [validate_ description]
 *
 * @private
 * @param  {[type]} input [description]
 * @return {[type]}       [description]
 */
form_controller.prototype.validate_ = function(input) {
  var errors = [];

  var value = input.input_element.val();

  if (
    input.required === true &&
    value === ''
    ) {
    errors.push(input.name + ' is required');
  }

  switch (input.type) {
    // nothing to check for these cases
    case 'string':
    case null:
    case false:
    case undefined:
      break;
    case 'email':
      if (value.match(/^.+@.+\..+$/) === null) {
        errors.push(input.name + ' is not a valid email address');
      }
      break;
  }

  // update GUI
  if (errors.length > 0) {
    input.input_element.addClass('input_error');
    input.error_message_element.html(errors[0]);
  }
  else {
    if (input.input_element.hasClass('input_error')) {
      input.input_element.removeClass('input_error');
      input.error_message_element.html('&nbsp');
    }
  }

  return errors;
};

/**
 * Calls validate on all inputs and returns a flag if errors are present
 *
 * @private
 * @return {Boolean} [description]
 */
form_controller.prototype.validate_all_ = function() {
  var pass = true;

  for (var input in this.inputs_) {
    var errors = this.validate_(this.inputs_[input]);
    if (errors.length > 0) {
      pass = false;
    }
  }

  return pass;
};

/**
 * [get_input_values_ description]
 *
 * @private
 * @return {[type]} [description]
 */
form_controller.prototype.get_input_values_ = function() {
  var values = {};
  for (var input in this.inputs_) {
    values[input] = this.inputs_[input].input_element.val();
  }
  return values;
};

/**
 * [submit_handler_ description]
 *
 * @private
 * @return {[type]} [description]
 */
form_controller.prototype.submit_handler_ = function() {
  var self = this;

  if (!this.validate_all_() || this.loading) {
    return;
  }

  this.loading = true;
  this.submit_.html('Sending...');
  // this.submit_.attr('disabled', true);

  var values = this.get_input_values_();
  var args = {
    'email_address': values.email_address,
    'name_first': values.name_first,
    'name_last': values.name_last,
    'message': values.message
  }

  // api('email', 'send_email', args, function(response) {
  //   // TODO
  //   console.log(response);
  // });
};
